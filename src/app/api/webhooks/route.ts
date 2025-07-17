import { NextResponse } from "next/server";
import { Prediction, validateWebhook } from "replicate";
// IMPORTANT: You need the base createClient function, not the server-specific one from SSR
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// This is the main request handler for the webhook
export async function POST(request: Request) {
  console.log("Received webhook...");

  const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret || !supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing environment variables for webhook processing.");
    return NextResponse.json(
      { detail: "Server configuration error." },
      { status: 500 }
    );
  }

  // FIX: Create a Supabase admin client using the Service Role Key.
  // This client will bypass RLS policies, which is necessary for a server-side process.
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

  const url = new URL(request.url);
  const jobId = url.searchParams.get("jobId");
  const userId = url.searchParams.get("userId");

  if (!jobId || !userId) {
    console.error("Webhook is missing 'jobId' or 'userId' URL parameter.");
    return NextResponse.json(
      { detail: "Missing required URL parameters." },
      { status: 400 }
    );
  }
  
  console.log("Webhook for job:", jobId, "from user:", userId);

  try {
    const webhookIsValid = await validateWebhook(request.clone(), secret);
    if (!webhookIsValid) {
      return NextResponse.json(
        { detail: "Webhook signature is invalid" },
        { status: 401 }
      );
    }

    console.log("Webhook is valid!");
    const prediction: Prediction = await request.json();

    // Pass the admin client to the processing function
    await processWebhook({
      prediction,
      userId,
      jobId,
      supabaseAdmin,
    });

    return NextResponse.json(
      { detail: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error processing webhook:", errorMessage);
    await supabaseAdmin
      .from("jobs")
      .update({ job_status: "failed", error_message: errorMessage })
      .eq("id", jobId);
      
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}

// This function now accepts the admin client
async function processWebhook({
  prediction,
  userId,
  jobId,
  supabaseAdmin, // Accept the admin client
}: {
  prediction: Prediction;
  userId: string;
  jobId: string;
  supabaseAdmin: SupabaseClient; // Define its type
}) {
  console.log(
    `Processing webhook for prediction ${prediction.id}, status: ${prediction.status}`
  );

  // Handle a successful prediction
  if (
    prediction.status === "succeeded" &&
    prediction.output &&
    Array.isArray(prediction.output) &&
    prediction.output.length > 0
  ) {
    try {
      const imageUrl = prediction.output[prediction.output.length - 1];
      console.log(`Downloading image from: ${imageUrl}`);

      const supabaseImageUrl = await downloadAndStoreImage({
        imageUrl: imageUrl,
        predictionId: prediction.id,
        supabaseAdmin: supabaseAdmin, // Pass the admin client down
      });

      console.log(`Image stored at: ${supabaseImageUrl}`);
      
      // Use the admin client for all database operations
      const { data: image, error: imageError } = await supabaseAdmin
        .from("images")
        .upsert({
          image_url: supabaseImageUrl,
          is_public: true,
          user_id: userId,
        })
        .select("id")
        .single();

      if (imageError || !image) {
        throw new Error("Failed to store image metadata: " + imageError.message);
      }

      await supabaseAdmin
        .from("job_output_images")
        .insert({
          image_id: image.id,
          job_id: jobId,
        });

      await supabaseAdmin.from("jobs").update({ job_status: "succeeded" }).eq("id", jobId);

      console.log(
        `Updated prediction ${prediction.id} with Supabase image URL`
      );
    } catch (error) {
      console.error("Error processing image:", error.message);
      await supabaseAdmin
        .from("jobs")
        .update({
          job_status: "failed",
          error_message: error.message,
        })
        .eq("id", jobId);
    }
  }
  // ... other status handling ...
}

// This utility function now requires the admin client
export async function downloadAndStoreImage({
  imageUrl,
  predictionId,
  supabaseAdmin, // Accept the admin client
}: {
  imageUrl: string;
  predictionId: string;
  supabaseAdmin: SupabaseClient; // Define its type
}) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const filename = `${predictionId}.png`;

    // Use the admin client for the storage operation
    const { data, error } = await supabaseAdmin.storage
      .from("generated-images")
      .upload(filename, imageBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading to Supabase Storage:", error);
      // This will re-throw the RLS error if it happens, but now it shouldn't
      throw error; 
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("generated-images").getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error("Error in downloadAndStoreImage:", error);
    throw new Error("Failed to upload image to storage."); // Propagate a cleaner error message
  }
}