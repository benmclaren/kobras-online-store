import Link from "next/link"

export default function Footer() {
  return(
    <div className="bg-slate-800 flex justify-between p-4 font-nohemi mt-8">
      <div className="flex flex-col">
        <Link href={"/products"} className="hover:text-color-secondary transition duration-75">Products</Link>
        <Link href={"/dashboard"} className="hover:text-color-secondary transition duration-75">Orders</Link>
        <h4 className="font-medium mt-2">©️Outgoing Kobras Online Store 2023</h4>
      </div>
      <div className="w-64">
        <p>Outgoing Kobras FC store is not currently a real store.</p>
        <p className="mt-2">Made with love by <Link href={"https://benmclaren.xyz/"} className="text-color-secondary hover:underline transition duration-75">Ben McLaren</Link></p>
      </div>
    </div>
  )
}
