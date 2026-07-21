export default function Suggestions({

items

}:{

items:string[]

}){

return(

<div className="rounded-2xl bg-blue-50 p-6">

<h2 className="font-bold">

Suggestions

</h2>

<ul className="mt-4 space-y-3">

{

items.map((item,index)=>(

<li key={index}>

✴ {item}

</li>

))

}

</ul>

</div>

)

}