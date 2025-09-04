"use client"

import { Card, CardContent, CardTitle } from "./card"
import { useEffect, useState } from "react"
import Image from "next/image"

interface MockProduct {
  id: string
  name: string
  description: string
  image: string
  price?: number
}

interface MockCarouselProps {
  products: MockProduct[]
}

export const MockCarousel = ({products}: MockCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [products.length])

  const currentProduct = products[currentIndex]

  return (
    <Card className="relative w-full h-[300px] overflow-hidden border-none">
      <div className="absolute inset-0 h-full w-full">
        <Image 
          alt={currentProduct.name} 
          src={currentProduct.image} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center">
        <CardTitle className="text-center font-heading py-2 px-4 text-3xl md:text-6xl text-cyan-600 mb-2 bg-gray-50/60 backdrop-blur-md rounded-xl">
          {currentProduct.name}
          {currentProduct.price && (
            <p className="text-2xl md:text-4xl">${(currentProduct.price).toFixed(2)}</p>
          )}
        </CardTitle>
      </CardContent>
    </Card>
  )
}