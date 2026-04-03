/*--- for Invoking function from our Inngest Dev Server---*/


import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";

import { helloWorld } from "@/inngest/functions";  // ← import karo

// Create an API that serves functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld,

  ],
//  functions: [processTask],  // ← yahan add karo
});