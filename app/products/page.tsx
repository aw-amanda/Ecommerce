import { stripe } from "@/lib/stripe"
import { ProductData } from "./_data/product-data"

export default async function ProductsPage() {
    const products = await stripe.products.list({
        expand: ["data.default_price"],
    })

    return(
        <main className="relative items-center justify-center">
            <h1 
                id="main-products-heading"
                className="text-cyan-400 text-center text-4xl md:text-7xl my-8 font-heading"
                tabIndex={-1}
            >
                Products
            </h1>
            <div 
                aria-live="assertive" 
                className="sr-only"
            >
                Products loaded successfully
            </div>
            <ProductData 
                products={products.data}
                aria-labelledby="main-products-heading" 
            />
            <div id="main-content" tabIndex={-1} className="sr-only"></div>
        </main>
    )
}