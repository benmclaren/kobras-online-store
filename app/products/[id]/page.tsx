import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";


export default async function Product({searchParams}: SearchParamTypes){
  // console.log(searchParams)
  return(
    <div className="flex lg:flex-row items-center justify-between">
      <Image
        src={searchParams.image} 
        alt={searchParams.name}
        width={400} 
        height={400}
        className="h-full"
        priority={true}
      />
      <div className="font-medium">
        <h1 className="text-2xl font-medium py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
        </div>
       <AddCart 
        id={searchParams.id}
        image={searchParams.image}
        name={searchParams.name}
        unit_amount={searchParams.unit_amount}
       
       />
      </div>
    </div>
  )
}
