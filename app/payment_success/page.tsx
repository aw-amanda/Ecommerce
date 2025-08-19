"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useRef } from "react"

export default function PaymentSuccess () {
    const { clearCart } = useCartStore()
    const mainRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        clearCart()
        mainRef.current?.focus()
    }, [clearCart])

    return (
        <main 
            ref={mainRef}
            tabIndex={-1}
            aria-labelledby="payment-success-heading"
            aria-live="polite"
            className="container mx-auto p-6 text-center"
        >
            <div role="alert" aria-live="assertive">
                <h1 
                    id="payment-success-heading"
                    className="text-cyan-400 text-2xl md:text-3xl mb-4 font-heading"
                >
                    Your payment was successful!
                </h1>
                <p className="text-cyan-400 mb-6 text-lg md:text-xl font-paragraph">
                    Your order is being processed.
                </p>
            </div>

            <Link 
                href={"/products"}
                aria-label="continue shopping"
                className="text-cyan-500 font-paragraph text-lg md:text-2xl hover:underline"
            >
                Continue Shopping
            </Link>
            <p className="sr-only">
                Your payment was processed successfuly and your cart has been cleared.
            </p>
        </main>
    )
}