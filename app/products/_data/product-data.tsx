"use client"

import Stripe from "stripe"
import { useEffect, useRef, useState } from "react"
import { ProductCard } from "../_components/product-card"

interface ProductDataProps {
    products: Stripe.Product[]
    className?: string
}

export const ProductData = ({products}: ProductDataProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchResultsCount, setSearchResultsCount] = useState<number>(0)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const resultsHeadingRef = useRef<HTMLHeadingElement>(null)

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase()
        const nameMatch = product.name.toLowerCase().includes(term)
        const descriptionMatch = product.description ? 
            product.description.toLowerCase().includes(term) : false
        return nameMatch || descriptionMatch
    })

    useEffect(() => {
        setSearchResultsCount(filteredProducts.length)
        searchInputRef.current?.focus()
    }, [filteredProducts])

    return (
        <section aria-labelledby="products-heading">
            <div className="flex justify-center p-2">
                <div className="w-full max-w-md m-10 relative">
                    <label 
                        htmlFor="product-search"
                        className="sr-only"
                    >
                        Search products
                    </label>
                    <input 
                        id="product-search"
                        ref={searchInputRef}
                        type="text" 
                        value={searchTerm}
                        aria-controls="products-list"
                        aria-describedby="results-count"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by product name or description..."
                        className="w-full max-w-md py-2 px-8 rounded-2xl bg-cyan-300/70
                                text-white focus:bg-black/80 focus:outline-none" 
                    />
                    <div
                        className="sr-only"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {searchResultsCount} {searchResultsCount === 1 ? 'result' : 'results'} found
                    </div>
                </div>
            </div>
            <h2
                id="products-heading"
                ref={resultsHeadingRef}
                className="sr-only"
            >
                Products
            </h2>
            <ul 
                id="products-list"
                aria-live="polite"
                className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <li 
                            key={product.id}
                            className="w-full"
                            aria-label={`Product ${index + 1} of ${filteredProducts.length}`}
                        >
                            <ProductCard product={product} />
                        </li>
                    ))
                ) : (
                    <li className="col-span-full text-center py-10">
                        <p className="text-cyan-400 text-xl md:text-2xl">
                            No products found matching your search.
                        </p>
                    </li>
                )}
            </ul>
        </section>
    )
}