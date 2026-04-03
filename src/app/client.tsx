"use client"

import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';

// React mein component names uppercase se shuru hone chahiye, warna React use HTML element samajhta hai aur undefined return karta hai.
export const Client=()=> {
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.createAI.queryOptions({text:"Antonio PREFETCH"}))
  
  
    // useEffect(()=>{})
    // const[]=useState()
    
    return (
    <div>
        {JSON.stringify(data)}
    </div>
  )
};