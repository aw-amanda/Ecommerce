"use client"

import Stripe from "stripe"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useRef } from "react"

interface ProductDetailProps {
    product: Stripe.Product
    className?: string
}

export const ProductDetail = ({product}: ProductDetailProps) => {
    const { items, addItem, removeItem } = useCartStore()
    const price = product.default_price as Stripe.Price
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0
    const priceAmount = price?.unit_amount ? 
                        `$${(price.unit_amount / 100).toFixed(2)}` : 
                        'Price not available'
    const quantityRef = useRef<HTMLSpanElement>(null)

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            image: product.images ? product.images[0]: null,
            quantity: 1,
        })
    }

    const onRemoveItem = () => {
        removeItem(product.id)
        setTimeout(() => quantityRef.current?.focus(), 100)
    }

    useEffect(() => {
        if (quantityRef.current) {
            quantityRef.current.setAttribute('aria-live', 'polite')
            quantityRef.current.setAttribute('aria-atomic', 'true')
        }
    }, [])

    return(
        <article className="container mx-auto flex flex-col items-center px-4 py-8 gap-8 md:flex-row">
            {product.images && product.images[0] && (
                <div className="relative w-full h-96 rounded-lg overflow-hidden md:w-1/2">
                    <Image 
                        alt={product.name} 
                        src={product.images[0]} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        className="transition duration-200 hover:opacity-90"
                        priority
                    />
                </div>
            )}
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-4 font-heading text-cyan-500">
                    {product.name}
                </h1>
                {product.description && (
                    <p className="text-lg md:text-xl text-gray-100 font-paragraph">
                        {product.description}
                    </p>
                )}
                <p 
                    className="py-4 font-heading text-lg md:text-2xl text-cyan-400"
                    aria-label={`Price: ${priceAmount}`}
                >
                    {priceAmount}
                </p>

                <div 
                    className="flex items-center text-center space-x-4 text-cyan-600 pt-2"
                    aria-label="quantity controls"
                >
                    <Button 
                        onClick={() => onRemoveItem}
                        variant="outline"
                        className="border-cyan-600 bg-transparent"
                        aria-label={`Decrease quantity of ${product.name}`}
                        disabled={quantity === 0}
                    > 
                        -
                    </Button>
                    <span 
                        ref={quantityRef}
                        className="text-lg md:text-2xl font-semibold"
                        aria-live="polite"
                        aria-atomic="true"
                        tabIndex={0}
                    >
                        {quantity}
                    </span>
                    <Button 
                        onClick={onAddItem}
                        variant="outline"
                        className="border-cyan-600 bg-transparent"
                        aria-label={`Increase quantity of ${product.name}`}
                    > 
                        +
                    </Button>
                </div>
            </div>
        </article>
    )
}