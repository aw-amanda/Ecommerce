"use client"

import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./card"
import { useEffect, useState } from "react"
import Image from "next/image"

interface CarouselProps {
    products: Stripe.Product[]
}

export const Carousel = ({products}: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)

        }, 4500)

        return () => clearInterval(interval)

    }, [products.length])

    const currentProduct = products[currentIndex]

    const price = currentProduct.default_price as Stripe.Price

    return (
        <Card className="relative w-full h-[300px] overflow-hidden border-none">
            {currentProduct.images && currentProduct.images[0] && (
                <div className="absolute inset-0 h-full w-full">
                    <Image 
                        alt={currentProduct.name} 
                        src={currentProduct.images[0]} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}
            <CardContent className="absolute inset-0 flex flex-col items-center justify-center">
                <CardTitle className="text-center font-heading py-2 px-4 text-3xl md:text-6xl text-cyan-600 mb-2 bg-gray-50/60 backdrop-blur-md rounded-xl"
                >
                    {currentProduct.name}
                    {price && price.unit_amount && (
                        <p className="text-2xl md:text-4xl">${(price.unit_amount / 100).toFixed(2)}</p>
                    )}
                </CardTitle>
            </CardContent>
        </Card>
    )
}