import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"
import { link } from "fs"

//  ProductType specifies type of data each arguemtn should be
export default function Product({name, image, unit_amount, id, description, metadata}: ProductType){
  // extracting the features content from metadata
  const { features } = metadata
  return(
    <Link href={{pathname: `/products/${id}`, query: { name, image, unit_amount, id, description, features }}}>
      <div className="text-gray-700">
        <Image src={image} alt={name} width={800} height={800} className="h-96 w-full object-cover rounded-lg"/>
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">{unit_amount !== null ? formatPrice(unit_amount) : "N/A"}</h2>
        </div>
      </div>
    </Link>
  )
}
