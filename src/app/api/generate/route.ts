import { createClient } from "@/src/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import Replicate, { Prediction } from "replicate";

// It's a good practice to validate environment variables at startup
if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN is not set");
}

if (!process.env.NGROK_HOST) {
    throw new Error("NGROK_HOST is not set. The webhook URL for Replicate will not work.");
}


const promptFormSchema = z.object({
  parameters: z.object(),
  conversationId: z.string().optional(),
  model: z.string().optional()
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_HOST = process.env.NGROK_HOST;
const CREDIT_COST_PER_IMAGE = 1;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // 1. Authenticate the user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "You must be logged in to generate images." }, { status: 401 });
    }

    // 2. Validate the request body
    const body = await req.json();
    console.log("Received Request Body:", body);
    // const parseResult = promptFormSchema.safeParse(body);
    // console.log("Parsed Request Body:", parseResult.data);
    // if (!parseResult.success) {
    //   return NextResponse.json({ error: "Invalid request body", details: parseResult.error.flatten() }, { status: 400 });
    // }

    const { parameters, conversationId: initialConversationId, model } = body;
    const totalCreditCost = 2;

    const { data, error } = await supabase.rpc('create_generation_job', {
        user_id: user.id,
        total_credit_cost: totalCreditCost,
        prompt: parameters?.prompt || "",
        initial_conversation_id: initialConversationId
    }).single();

    if (error) {
      if (error.code === 'PGRST116' && error.details.includes('P0001')) { 
          return NextResponse.json({ error: error.message }, { status: 402 });
      }
      throw error;
    }

    const { new_job_id: newJobId, returned_conversation_id: currentConversationId } = data;


    // 5. Trigger the prediction with Replicate
    const webhookUrl = `${WEBHOOK_HOST}/api/webhooks?jobId=${newJobId}&userId=${user.id}`;
    const options: any = {
      model: model,
      input: parameters,
      webhook: webhookUrl,
      webhook_events_filter: ["completed"],
    };

    const prediction = await replicate.predictions.create(options);

    await supabase
    .from("jobs")
    .update({
      prediction_id: prediction.id,
      job_status:    prediction.status,
      parameters: parameters,
    })
    .eq("id", newJobId);

    // 7. Create the user message that links to this job
    const { data: lastMessage } = await supabase
        .from("messages")
        .select("sequence_number")
        .eq("conversation_id", currentConversationId)
        .order("sequence_number", { ascending: false })
        .limit(1)
        .single();

    const nextSequenceNumber = lastMessage ? lastMessage.sequence_number + 1 : 0;
    
    await supabase.from("messages").insert({
        conversation_id: currentConversationId,
        positive_prompt: parameters.prompt,
        negative_prompt: "",
        triggered_job_id: newJobId,
        sequence_number: nextSequenceNumber,
    });

    // 8. Return a success response
    return NextResponse.json({ conversationId: currentConversationId }, { status: 200 });

  } catch (error: any) {
    console.error(`[Image Generation Error]: ${error.message}`);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again later." }, { status: 500 });
  }
}