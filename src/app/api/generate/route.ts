import { createClient } from "@/src/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import Replicate, { Prediction } from "replicate";
// Define the schema for the incoming request body.
const promptFormSchema = z.object({
  prompt: z.string(),
  negativePrompt: z.string().optional(),
  batchCount: z.number().min(1),
  ratio: z.string(),
  quality: z.string(),
  enhancePrompt: z.boolean(),
  conversationId: z.string().optional(),
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
    const parseResult = promptFormSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid request body", details: parseResult.error.flatten() }, { status: 400 });
    }

    const formData = parseResult.data;
    const totalCreditCost = CREDIT_COST_PER_IMAGE * formData.batchCount;

    // 3. Fast-Fail: Check for user profile and credits.
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Could not find user profile." }, { status: 404 });
    }
    if (profile.credits < totalCreditCost) {
      return NextResponse.json({ error: `Not enough credits. This request requires ${totalCreditCost} credits, but you only have ${profile.credits}.` }, { status: 402 });
    }

    // 4. Create or identify the conversation
    let currentConversationId = formData.conversationId;
    if (!currentConversationId) {
        const { data: newConversation, error: convError } = await supabase
            .from("conversations")
            .insert({ user_id: user.id, title: formData.prompt.substring(0, 50) })
            .select("id").single();
        if (convError) throw convError;
        if (!newConversation) throw new Error("Failed to create a new conversation.");
        currentConversationId = newConversation.id;
    }

    // 5. Create the job record in the database
    const { data: newJob, error: jobError } = await supabase
    .from("jobs")
    .insert({
      user_id: user.id,
        credit_cost: totalCreditCost,
      })
      .select("id")
      .single();
      
    if (jobError) throw jobError;
    
    if (!newJob) {
      throw new Error("Failed to create the generation job in the database.");
    }
    
    const webhookUrl = `${WEBHOOK_HOST}/api/webhooks?jobId=${newJob.id}&userId=${user.id}`;
    
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }
    
    const options: any = {
      model: "black-forest-labs/flux-dev",
      input: {prompt: formData.prompt },
      webhook: webhookUrl,
      webhook_events_filter: ["completed"],
    };
    
    const prediction: Prediction = await replicate.predictions.create(options);
    
    console.log(prediction)
    
    const jobParameters = {
      prompt: formData.prompt,
      negative_prompt: formData.negativePrompt,
      aspect_ratio: formData.ratio,
      num_inference_steps: formData.quality,
      enhance_prompt: formData.enhancePrompt,
      num_outputs: formData.batchCount,
      model: prediction.model,
      urls: prediction.urls,
      metrics: prediction.metrics
    };

    await supabase
    .from("jobs")
    .update({
      prediction_id: prediction.id,
      job_status:    prediction.status,
      parameters: jobParameters
    })
    .eq("id", newJob.id);

     // 6. Create the user message that links to this job
    const { data: lastMessage, error: seqError } = await supabase
        .from("messages")
        .select("sequence_number")
        .eq("conversation_id", currentConversationId)
        .order("sequence_number", { ascending: false })
        .limit(1)
        .single();

    if (seqError && seqError.code !== "PGRST116") throw seqError;
    const nextSequenceNumber = lastMessage ? lastMessage.sequence_number + 1 : 0;
    
    await supabase.from("messages").insert({
        conversation_id: currentConversationId,
        positive_prompt: formData.prompt,
        negative_prompt: formData.negativePrompt,
        triggered_job_id: newJob.id,
        sequence_number: nextSequenceNumber,
    });


    // 7. Return a success response
    return NextResponse.json({ conversationId: currentConversationId }, { status: 200 });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}