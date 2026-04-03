// src/inngest/functions.ts
import { inngest } from "./client";

// export const processTask = inngest.createFunction(
//   { id: "process-task", triggers: { event: "app/task.created" } },
//   async ({ event, step }) => {
//     const result = await step.run("handle-task", async () => {
//       return { processed: true, id: event.data.id };
//     });

//     await step.sleep("pause", "1s");

//     return { message: `Task ${event.data.id} complete`, result };
//   }
// );

/*--- for Invoking function from our Inngest Dev Server---*/

//Triggers alag object mein nahi, pehle object ke andar hona chahiye:
export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },  // ← sab ek object mein
  async ({ event, step }) => {

    // download step
    await step.sleep("wait-a-moment:Download Step", "15s");

    // transcript step
    await step.sleep("wait-a-moment: transcript step", "10s");

    // summary step
    await step.sleep("wait-a-moment: summary step", "5s");
    return { message: `Hello ${event.data.email}!` };
  }
);