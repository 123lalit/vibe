// "use client"                                       // for prefetching, remove "use client" from here
// import { useQuery } from "@tanstack/react-query";  // for prefetching, remove 
// import { useTRPC } from "@/trpc/client"            // for prefetching, remove 

// import { log } from "console"

// import { caller} from '../trpc/server';

import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient,trpc } from '../trpc/server';

import { Client } from "./client";

async function Page() {

  // const trpc=useTRPC();                                                        // for prefetching, remove 

  // const {data} = useQuery(fetch("/api/create-ai",{body:JSON}));                // for prefetching, remove 
  // const {data} = useQuery( trpc.createAI.queryOptions({ text: "Antonio" }) );  // for prefetching, remove 
  // localhost:3000/api/create-ai?body={text:"hello"}


  /*---fetching data from a server component using tRPC using a caller---*/
  // console.log("SERVER COMPONENT"); 
 // const data=await caller.createAI({text: "Antonio SERVER"})

  /*--- Using tRPC for Pre-fetching---*/
  // Page.tsc is the prefetcher / server component
const queryClient=getQueryClient();
void queryClient.prefetchQuery(trpc.createAI.queryOptions({text:"Antonio PREFETCH"}));


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <Client/>
          {/* <div>  {JSON.stringify(data)} </div> */}
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page


// trpc.baseProcedureNamein_app.ts