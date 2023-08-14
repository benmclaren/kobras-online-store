import { log } from "console"
import Stripe from "stripe"
import Product from "./components/Product"
import Hero from "./components/Hero"

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  })
  const products = await stripe.products.list()
  console.log(products)

  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({product: product.id})
      const features = product.metadata.features || ""  // Extract the features content rom the metadata
      return{
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features }
      }
    })
  )
  return productsWithPrices
}

export default async function Home() {
  const products = await getProducts()
  // console.log(products)
  return (
    <div>
      <Hero/>
      <h2>Featured Players</h2>
      <main className="grid grid-cols-5 gap-12">
        {products.filter((item, index) => index < 5).map((filteredItem) => (
          <Product {...filteredItem} />
        ))}
      </main>
    </div>
  )
}
