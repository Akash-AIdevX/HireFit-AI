export default function Weaknesses({

items

}:{

items:string[]

}){

return(

<div className="rounded-2xl bg-red-50 p-6">

<h2 className="font-bold text-xl">

Weaknesses

</h2>

<ul className="mt-4 space-y-2">

{

items.map((item,index)=>(

<li key={index}>

✘ {item}

</li>

))

}

</ul>

</div>

)

}