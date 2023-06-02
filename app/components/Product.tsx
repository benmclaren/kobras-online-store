import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"
import { link } from "fs"

//  ProductType specifies type of data each arguemtn should be
export default function Product({name, price, image, id}: ProductType){
  return(
    <Link href={{pathname: `/products/${id}`, query: { name, image, price, id }}}>
      <div className="text-gray-700">
        <Image src={image} alt={name} width={800} height={800} className="h-96 w-full object-cover rounded-lg"/>
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">{price !== null ? formatPrice(price) : "N/A"}</h2>
        </div>
      </div>
    </Link>
  )
}
