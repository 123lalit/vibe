import { inngest } from '@/inngest/client';  // ← ye missing hai
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
 
export const appRouter = createTRPCRouter({

  // trying to invoke background-job or function from tRPC procedure
  //  Instead of Inngest Dev Server
   invoke:baseProcedure
   .input(
    z.object({
      //  text:z.string(),
          value:z.string(),      
    })
   )
   .mutation(async({input})=>{
        await inngest.send({
  // check out name of the event in functions.ts
          name:"test/hello.world",
          data:{
  // check out functions.ts for return stmt having ${event.data.email}
  // check out the above given baseProcedure for datatype of email
  // email:input.text,
            // email:input.text,
            value:input.value,   
          }
        })
        return{ ok: "success" };
   }),

  createAI: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;