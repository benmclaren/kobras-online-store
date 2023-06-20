import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";


export default async function Product({searchParams}: SearchParamTypes){
  // console.log(searchParams)
  return(
    <div className="flex flex-col lg:flex-row items-center justify-between gap-24 text-gray-700">
      <Image
        src={searchParams.image} 
        alt={searchParams.name}
        width={600} 
        height={600}
        className="w-full"
      />
      <div className="font-medium">
        <h1 className="text-2xl font-medium py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
        </div>
       <AddCart {...searchParams}/>
      </div>
    </div>
  )
}
