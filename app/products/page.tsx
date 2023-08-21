import Stripe from "stripe"
import Product from "../components/Product"

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

export default async function Directory(){
  const products = await getProducts()
  return(
    <div>
      <h1>Products page</h1>
      <main className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12">
        {products.map((filteredItem) => (
          <Product {...filteredItem} />
        ))}
      </main>
    </div>
  )
}
