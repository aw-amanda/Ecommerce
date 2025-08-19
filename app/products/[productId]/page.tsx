import { stripe } from "@/lib/stripe"
import { ProductDetail } from "../_components/product-detail"

export default async function ProductDetailPage({ 
    params,
}: {
    params: Promise<{ productId: string }>
}) {
    const product = await stripe.products.retrieve((await params).productId, {
        expand: ["default_price"],
    })

    const plainProduct = JSON.parse(JSON.stringify(product))
    return (
        <ProductDetail product={plainProduct} />
    )
}