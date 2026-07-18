"use client";

import { useEffect,useState } from "react";

import Link from "next/link";

import { getHistory } from "@/lib/review";

export default function HistoryPage(){

const[reviews,setReviews]=useState<any[]>([]);

useEffect(()=>{

load();

},[]);

async function load(){

const data=await getHistory();

setReviews(data);

}

return(

<div className="max-w-5xl mx-auto py-10">

<h1 className="text-4xl font-bold mb-10">

Review History

</h1>

<div className="space-y-5">

{reviews.map((r)=>(

<Link

key={r.id}

href={`/dashboard/review/${r.id}`}

>

<div className="border rounded-2xl p-5 hover:bg-gray-50">

<h2>

{r.filename}

</h2>

<p>

ATS Score : {r.ats_score}

</p>

</div>

</Link>

))}

</div>

</div>

)

}