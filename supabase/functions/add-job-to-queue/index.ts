// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/add-job-to-queue' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
// supabase/functions/add-job-to-queue/index.ts

// --- THIS IS THE CORRECTED IMPORT ---
import PgBoss from 'npm:pg-boss@10.3.2'
// ------------------------------------

console.log("Add job to queue function initializing.");

Deno.serve(async (req) => {
  // pg-boss requires the direct database connection string
  const connectionString = Deno.env.get('DATABASE_URL')!;
  const boss = new PgBoss(connectionString);
  
  // It's important to start and stop pg-boss in each invocation
  // of a serverless function.
  await boss.start();
  console.log("pg-boss started.");

  const payload = await req.json();
  const job = payload.record; // Webhook payload puts the new row in 'record'

  if (!job || !job.id) {
    console.error("Invalid job payload received:", payload);
    await boss.stop();
    return new Response(JSON.stringify({ error: 'Invalid job payload' }), { status: 400 });
  }

  // The 'parameters' field should contain the prompt
  const parameters = job.parameters;
  if (!parameters || !parameters.prompt) {
      console.error("Job payload missing parameters.prompt:", payload);
      await boss.stop();
      return new Response(JSON.stringify({ error: 'Job parameters must include a prompt' }), { status: 400 });
  }

  const queueName = 'image-generation-jobs'; // The name of our queue
  // Pass only the jobId. The worker will fetch the full details.
  const data = { jobId: job.id };

  // Send the job to the queue.
  await boss.send(queueName, data);
  console.log(`Sent job ${job.id} to queue '${queueName}'.`);

  await boss.stop();
  console.log("pg-boss stopped.");

  return new Response(
    JSON.stringify({ success: true, queuedJobId: job.id }),
    { headers: { "Content-Type": "application/json" } }
  );
});