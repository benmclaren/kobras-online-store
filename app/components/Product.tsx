import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"

//  ProductType specifies type of data each argument should be
export default function Product({name, image, unit_amount, id, description, metadata}: ProductType){
  // extracting the features content from metadata
  const { features } = metadata
  const queryId = id
  return(
    <Link href={{pathname: `/products/${id}`, query: { name, image, unit_amount, queryId, description, features }}} className="carousel-item snap-center">
      <div className="text-gray-700">
        <Image src={image} alt={name} width={200} height={200} className="content-center text-center  sm:w-full object-cover rounded-lg"/>
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">{unit_amount !== null ? formatPrice(unit_amount) : "N/A"}</h2>
        </div>
      </div>
    </Link>
  )
}
