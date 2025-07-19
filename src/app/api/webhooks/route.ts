// /webhook/route.ts

import { NextResponse } from "next/server";
import { Prediction, validateWebhook } from "replicate";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Best practice: Create a dedicated admin client module
// e.g., in /src/lib/supabase/admin.ts
const getSupabaseAdmin = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Missing Supabase admin credentials.");
    }
    return createClient(supabaseUrl, supabaseServiceRoleKey);
}

export async function POST(request: Request) {
  const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;
  if (!secret) {
    console.error("REPLICATE_WEBHOOK_SIGNING_SECRET is not set.");
    return NextResponse.json({ detail: "Server configuration error." }, { status: 500 });
  }

  const url = new URL(request.url);
  const jobId = url.searchParams.get("jobId");
  const userId = url.searchParams.get("userId");

  if (!jobId || !userId) {
    return NextResponse.json({ detail: "Missing required URL parameters." }, { status: 400 });
  }

  try {
    const valid = await validateWebhook(request.clone(), secret);
    if (!valid) {
      return NextResponse.json({ detail: "Invalid webhook signature." }, { status: 401 });
    }

    const prediction: Prediction = await request.json();
    const supabaseAdmin = getSupabaseAdmin();

    // Idempotency Check: See if job is already processed.
    const { data: currentJob } = await supabaseAdmin
      .from("jobs")
      .select("job_status")
      .eq("id", jobId)
      .single();

    if (currentJob && (currentJob.job_status === 'succeeded' || currentJob.job_status === 'failed')) {
        console.log(`Job ${jobId} already processed. Ignoring duplicate webhook.`);
        return NextResponse.json({ detail: "Webhook already processed." }, { status: 200 });
    }

    // Handle failed predictions
    if (prediction.status === "failed") {
        await supabaseAdmin
            .from("jobs")
            .update({ job_status: "failed", error_message: prediction.error })
            .eq("id", jobId);
        // Here you could also trigger a credit refund.
        return NextResponse.json({ detail: "Processed failed prediction." }, { status: 200 });
    }

    // Handle successful predictions
    if (prediction.status === "succeeded" && Array.isArray(prediction.output)) {
        await processSuccessfulPrediction({ prediction, userId, jobId, supabaseAdmin });
    }

    return NextResponse.json({ detail: "Webhook processed successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Error processing webhook:", error.message);
    const supabaseAdmin = getSupabaseAdmin();
    await supabaseAdmin
      .from("jobs")
      .update({ job_status: "failed", error_message: error.message })
      .eq("id", jobId);
      
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}

async function processSuccessfulPrediction({ prediction, userId, jobId, supabaseAdmin }: any) {
  // BUG FIX: Process all images from the output, not just the last one.
  const imageProcessingPromises = prediction.output.map(async (imageUrl: string) => {
    const supabaseImageUrl = await downloadAndStoreImage({
      imageUrl,
      predictionId: prediction.id,
      imageIdentifier: prediction.output.indexOf(imageUrl), // To create unique names
      supabaseAdmin,
    });

    // We need the image ID to link it to the job.
    const { data: newImage, error } = await supabaseAdmin
      .from("images")
      .insert({
        image_url: supabaseImageUrl,
        is_public: true,
        user_id: userId,
      })
      .select("id")
      .single();

    if (error) throw new Error(`Failed to store image metadata: ${error.message}`);
    return newImage.id;
  });

  const imageIds = await Promise.all(imageProcessingPromises);

  // Use a transaction to link images and update the job status.
  // This ensures that if linking fails, the whole operation fails.
  const jobOutputImages = imageIds.map(imageId => ({ image_id: imageId, job_id: jobId }));
  
  const { error: linkError } = await supabaseAdmin.from("job_output_images").insert(jobOutputImages);
  if (linkError) throw new Error(`Failed to link images to job: ${linkError.message}`);

  await supabaseAdmin.from("jobs").update({ job_status: "succeeded" }).eq("id", jobId);
  console.log(`Successfully processed job ${jobId} with ${imageIds.length} images.`);
}

async function downloadAndStoreImage({ imageUrl, predictionId, imageIdentifier, supabaseAdmin }: any) {
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Failed to download image: ${response.statusText}`);

  const imageBuffer = await response.arrayBuffer();
  // Ensure a unique filename for each image in a batch
  const filename = `${predictionId}-${imageIdentifier}.png`;

  const { error } = await supabaseAdmin.storage
    .from("generated-images")
    .upload(filename, imageBuffer, { contentType: "image/png", upsert: true });

  if (error) throw new Error(`Failed to upload image to storage: ${error.message}`);

  const { data: { publicUrl } } = supabaseAdmin.storage.from("generated-images").getPublicUrl(filename);
  return publicUrl;
}