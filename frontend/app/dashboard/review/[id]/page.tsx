"use client";

import { useEffect,useState } from "react";

import { useParams } from "next/navigation";

import { getReview } from "@/lib/review";

export default function ReviewPage(){

const params=useParams();

const[data,setData]=useState<any>();

useEffect(()=>{

load();

},[]);

async function load(){

const res=await getReview(Number(params.id));

setData(res);

}

if(!data){

return<div>Loading...</div>

}

return(

<div className="max-w-6xl mx-auto py-10">

<h1 className="text-4xl font-bold">

ATS Score

</h1>

<div className="text-7xl font-bold text-blue-600">

{data.ats_score}

</div>

<h2 className="mt-10 text-2xl">

Strengths

</h2>

<ul>

{data.strengths.map((s:string)=>(

<li key={s}>

✓ {s}

</li>

))}

</ul>

<h2 className="mt-10 text-2xl">

Weaknesses

</h2>

<ul>

{data.weaknesses.map((s:string)=>(

<li key={s}>

✘ {s}

</li>

))}

</ul>

<h2 className="mt-10 text-2xl">

Missing Keywords

</h2>

<div className="flex gap-3 flex-wrap">

{data.missing_keywords.map((s:string)=>(

<span

key={s}

className="bg-red-100 rounded-full px-4 py-2"

>

{s}

</span>

))}

</div>

<h2 className="mt-10 text-2xl">

Suggestions

</h2>

<ul>

{data.suggestions.map((s:string)=>(

<li key={s}>

✴ {s}

</li>

))}

</ul>

</div>

)

}