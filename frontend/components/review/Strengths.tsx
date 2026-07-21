export default function Strengths({

items

}:{

items:string[]

}){

return(

<div className="rounded-2xl bg-green-50 p-6">

<h2 className="font-bold text-xl">

Strengths

</h2>

<ul className="mt-4 space-y-2">

{

items.map((item,index)=>(

<li key={index}>

✓ {item}

</li>

))

}

</ul>

</div>

)

}