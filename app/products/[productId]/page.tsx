// import { stripe } from "@/lib/stripe"
// import { ProductDetail } from "../_components/product-detail"

// export default async function ProductDetailPage({ 
//     params,
// }: {
//     params: Promise<{ productId: string }>
// }) {
//     const product = await stripe.products.retrieve((await params).productId, {
//         expand: ["default_price"],
//     })

//     const plainProduct = JSON.parse(JSON.stringify(product))
//     return (
//         <ProductDetail product={plainProduct} />
//     )
// }

import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const mockProducts = [
  {
    id: "1",
    name: "Artisan Macaroons",
    description: "Delicate French macaroons in assorted flavors",
    price: 29.99,
    images: ["/macaroons.jpg"],
    features: ["Assorted flavors", "Gluten-free options", "Perfect for events"]
  },
  {
    id: "2", 
    name: "Custom Wedding Cakes",
    description: "Elegant bespoke wedding cakes",
    price: 89.99,
    images: ["/cake.jpg"],
    features: ["Custom designs", "Multiple tiers", "Delivery available"]
  },
  {
    id: "3",
    name: "Seasonal Pastries",
    description: "Fresh pastries made with organic fruits",
    price: 19.99,
    images: ["/pastries.jpg"],
    features: ["Seasonal ingredients", "Vegan options", "Fresh daily"]
  }
]

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params
  const product = mockProducts.find(p => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-cyan-600 mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          
          <ul className="mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="mb-2">• {feature}</li>
            ))}
          </ul>

          <Button className="bg-cyan-600 hover:bg-cyan-700">
            Add to Cart (Demo)
          </Button>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    productId: product.id,
  }))
}