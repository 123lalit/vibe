/*--- Page.tsc is the prefetcher / server component ---*/

/*---REST API call with useQuery ---*/
// "use client"                                       // for prefetching, remove "use client" from here
// import { useQuery } from "@tanstack/react-query";  // for prefetching, remove 
// import { useTRPC } from "@/trpc/client"            // for prefetching, remove 


/*---fetching data from a server component using tRPC using a caller---*/
// import { caller} from '../trpc/server';
// import { log } from "console"

  /*--- Using tRPC for Pre-fetching---*/
// import { Suspense } from "react";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getQueryClient,trpc } from '../trpc/server';
// import { Client } from "./client";

"use client"

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button";

// <Page> is an async Client Component. Only Server Components can be async at the moment. 
function Page() {

/*---REST API call with useQuery kehlata hai — ye tRPC nahi hai, vanilla fetch hai---*/
  // const trpc=useTRPC();                                                        // for prefetching, remove 
  // const {data} = useQuery(fetch("/api/create-ai",{body:JSON}));                // for prefetching, remove 


  // const {data} = useQuery( trpc.createAI.queryOptions({ text: "Antonio" }) );  // for prefetching, remove 
  // Comment: trpc.baseProcedureNamein_app.ts.queryOptions({})
  // comment: localhost:3000/api/create-ai?body={text:"hello"}


  /*---fetching data from a server component using tRPC using a caller---*/
  // console.log("SERVER COMPONENT"); 
 // const data=await caller.createAI({text: "Antonio SERVER"})

  /*--- Using tRPC for Pre-fetching---*/
// const queryClient=getQueryClient();
// void queryClient.prefetchQuery(trpc.createAI.queryOptions({text:"Antonio PREFETCH"}));


const trpc=useTRPC();

// using Toaster inside layout.tsx
const invoke=useMutation(trpc.invoke.mutationOptions({
  onSuccess:()=>{
    toast.success("Background Job Started")
  }
}));



  
return (

    /*--- Using tRPC for Pre-fetching---*/
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Suspense fallback={<p>Loading...</p>}>
    //     <Client/>
    //       {/* <div>  {JSON.stringify(data)} </div> */}
    //   </Suspense>
    // </HydrationBoundary>


    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={()=> invoke.mutate({text:"John"})}>
          Invoke Background Job
      </Button>
    </div>
  )
}

export default Page




/*
Comparison — teen approaches:

Approach	                                          Naam
fetch("/api/...")                             with useQuery	REST + React Query
useQuery(trpc.createAI.queryOptions(...))	    tRPC Client-side fetching
await caller.createAI(...)	                  tRPC Server Component (direct caller)
prefetchQuery + HydrationBoundary	            tRPC Prefetching (SSR)
*/