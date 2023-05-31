import Image from "next/image"

export default function Product({name, price, image}){
  return(
    <div>
      <Image src={image} alt={name} width={400} height={400} />
      <h1>{name}</h1>
      <h1>{price}</h1>
    </div>
  )
}
