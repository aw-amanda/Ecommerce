// import { stripe } from "@/lib/stripe"
// import { ProductData } from "./_data/product-data"

// export default async function ProductsPage() {
//     const products = await stripe.products.list({
//         expand: ["data.default_price"],
//     })

//     return(
//         <main className="relative items-center justify-center">
//             <h1 
//                 id="main-products-heading"
//                 className="text-cyan-400 text-center text-4xl md:text-7xl my-8 font-heading"
//                 tabIndex={-1}
//             >
//                 Products
//             </h1>
//             <div 
//                 aria-live="assertive" 
//                 className="sr-only"
//             >
//                 Products loaded successfully
//             </div>
//             <ProductData 
//                 products={products.data}
//                 aria-labelledby="main-products-heading" 
//             />
//             <div id="main-content" tabIndex={-1} className="sr-only"></div>
//         </main>
//     )
// }


import Link from "next/link"
import Image from "next/image"

const mockProducts = [
  {
    id: "1",
    name: "Artisan Macaroons",
    description: "Delicate French macaroons in assorted flavors",
    price: 29.99,
    image: "/Ecommerce/macaroons.jpg",
  },
  {
    id: "2", 
    name: "Custom Wedding Cakes",
    description: "Elegant bespoke wedding cakes",
    price: 89.99,
    image: "/Ecommerce/cake.jpg",
  },
  {
    id: "3",
    name: "Seasonal Pastries",
    description: "Fresh pastries made with organic fruits",
    price: 19.99,
    image: "/Ecommerce/pastries.jpg",
  }
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-cyan-600 mb-2">${product.price}</p>
            <p className="mb-4">{product.description}</p>
            <Link 
              href={`/products/${product.id}`}
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}