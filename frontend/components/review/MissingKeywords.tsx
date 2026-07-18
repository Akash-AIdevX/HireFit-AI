export default function MissingKeywords({

items

}:{

items:string[]

}){

return(

<div className="rounded-2xl bg-yellow-50 p-6">

<h2 className="font-bold">

Missing Keywords

</h2>

<div className="flex flex-wrap gap-3 mt-4">

{

items.map((item,index)=>(

<span

key={index}

className="rounded-full bg-yellow-300 px-3 py-1"

>

{item}

</span>

))

}

</div>

</div>

)

}