import Link from "next/link"
import Stripe from "stripe"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductCardProps {
    product: Stripe.Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const price = product.default_price as Stripe.Price
    const priceAmount = price?.unit_amount ? 
                        `$${(price.unit_amount / 100).toFixed(2)}` : 
                        'Price not available'

    return (
        <article className="h-full">
            <Link 
                href={`/products/${product.id}`} 
                className="block h-full"
                aria-labelledby={`product-${product.id}-title product-${product.id}-price`}
                aria-describedby={`product-${product.id}-desc`}
                passHref
            >
                <Card className="h-full flex flex-col py-0 bg-black/25">
                    {product.images && product.images[0] && (
                        <div className="relative h-60 w-full" aria-hidden="true">
                            <Image 
                                alt={product.name} 
                                src={product.images[0]} 
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="group-hover:opacity-90 transition-opacity duration-400 rounded-xl"
                                priority={false}
                            />
                        </div>
                    )}
                    <CardHeader className="p-4">
                        <CardTitle 
                            id={`product-${product.id}-title`}
                            className="mb-4 text-2xl md:text-3xl text-center font-bold text-cyan-400 font-heading"
                        >
                            {product.name}
                        </CardTitle>
                        <CardContent 
                            id={`product-${product.id}-desc`}
                            className="bg-cyan-300/60 rounded-2xl p-4 flex-grow flex flex-col 
                                      justify-between font-paragraph text-black"
                        >
                            <p>{product.description}</p>
                            <div className="mt-4 space-y-4">
                                <p 
                                    id={`product-${product.id}-price`}
                                    className="text-xl md:text-2xl text-gray-900 font-heading"
                                    aria-label={`Price: ${priceAmount}`}
                                >
                                    {priceAmount}
                                </p>
                                <Button 
                                    className="mt-2 w-full bg-black/40 hover:bg-black/80 
                                            text-gray-50 text-md md:text-lg font-heading"
                                    aria-hidden="true"
                                    tabIndex={-1}
                                >
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
            </Link>
        </article>
    )
}