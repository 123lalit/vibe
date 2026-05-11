// src/inngest/functions.ts
import { createAgent, openai } from "@inngest/agent-kit";
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
  // { id: "hello-world"},    // arg 1
  // { event: "test/hello.world" },  // arg 2 ← WRONG
  
  // ✅ Naya style (2 arguments) — jo karna hai:
   { id: "hello-world", triggers: [{ event: "test/hello.world" }] },  // arg 1
  async ({ event, step }) => {      // arg 2

    if (!event?.data?.value) {
      throw new Error("Missing 'value' in event data");
    }

    // await step.sleep("wait-a-moment: Download Step", "15s");
   // await step.sleep("wait-a-moment: transcript step", "10s");
    // await step.sleep("wait-a-moment: summary step", "5s");

    // await step.sleep("wait-a-moment", "5s");
    // return { message: `Hello ${event.data.value}!` };

    const codeAgent = createAgent({
      name:"code-agent",
      system:"you are an expert next.js developer. you write readable, maintainable code. you write simple Next.js & React Snippets.",

      // ❌
      // model: grok("grok-3-latest")  // may not exist on free tier

      // ✅ Try this for grok
     // model:grok({model:"grok-3-mini-latest"}), // lighter model, more available

        // ✅ Try this instead
      model:openai({model:"gpt-4o"}), // lighter model, more available
    });

    // Run AI agent
    const {output} = await codeAgent.run(
      `Write the following Snippet: ${event.data.value}`
    );

    return {output};
  }
);