"use client"

import Image from "next/image"
import checkoutBG from "@/public/checkoutBG.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from "@/store/cart-store"
import { checkoutAction } from "./_components/checkout-action"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function CheckoutPage() {
    const { items, removeItem, addItem, clearCart } = useCartStore()
    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )
    const mainRef = useRef<HTMLDivElement>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        if ((total === 0 || items.length === 0) && mainRef.current) {
            mainRef.current.focus()
        }
    }, [total, items])

    // client-side form handler
    const handleCheckout = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsProcessing(true)
        
        try {
            // mock FormData object for the checkout action
            const formData = new FormData()
            formData.append("items", JSON.stringify(items))
            
            await checkoutAction(formData)
        } catch (error) {
            console.error("Checkout failed:", error)
            alert("Checkout simulation completed. In a live environment, this would process your payment.")
        } finally {
            setIsProcessing(false)
        }
    }

    if (total === 0 || items.length === 0) {
        return (
            <main 
                ref={mainRef}
                tabIndex={-1}
                className="relative w-full h-screen overflow-hidden"
                aria-live="polite"
            >
                <div 
                    className="fixed inset-0 -z-10"
                    aria-hidden="true"
                >
                    <Image
                        src={checkoutBG}
                        alt=""
                        fill
                        className="object-cover"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
                <h1 
                    tabIndex={-1}
                    className="bg-black/50 backdrop-blur-md rounded-2xl p-3 mx-10 mt-8
                              text-center font-heading text-2xl md:text-7xl text-cyan-500"
                >
                    Cart is Empty
                </h1>
                <Link 
                    href="/products"
                    className="block text-center mt-8 font-heading
                            text-cyan-400 text-xl md:text-3xl"
                >
                    Continue Shopping
                </Link>
            </main>
        )
    }

    return(
        <main 
            className="max-w-screen h-screen items-center justify-center"
            ref={mainRef}
            tabIndex={-1}
            aria-labelledby="checkout-heading"
        >
            <div 
                className="fixed inset-0 -z-10"
                aria-hidden="true"
            >
                <Image
                    src={checkoutBG}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="relative mx-32 pt-6">
                <h1 
                    id="checkout-heading"
                    className="text-3xl md:text-7xl py-4 mb-5 text-center text-cyan-400 font-heading"
                >
                    Checkout
                </h1>
                <Card 
                    className="flex flex-col w-full px-4 text-center rounded-xl bg-black/60 backdrop-blur-md"
                    role="region"
                    aria-labelledby="order-summary-heading"
                >
                    <CardHeader className="border-2 py-4 rounded-xl shadow-md">
                        <CardTitle 
                            id="order-summary-heading"
                            className="text-xl md:text-2xl text-white font-paragraph"
                        >
                            Order Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul 
                            className="space-y-5 font-paragraph"
                            aria-live="polite"
                        >
                            {items.map((item, key) => (
                                <li 
                                    key={key} 
                                    className="flex flex-col gap-2 border-b pb-2"
                                    aria-label={`${item.name}, quantity: ${item.quantity},
                                               price: $${((item.price * item.quantity) / 100).toFixed(2)}`
                                    }
                                >
                                    <div className="flex justify-between text-white font-semibold text-xl md:text-2xl">
                                        <span> {item.name}</span>
                                        <span> $ {((item.price * item.quantity) / 100).toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center text-white gap-2">
                                            <Button 
                                                onClick={() => removeItem(item.id)}
                                                variant="outline"
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            > 
                                                - 
                                            </Button>
                                            <span 
                                                className="text-lg font-bold"
                                                aria-live="polite"
                                            >
                                                {item.quantity}
                                            </span>
                                            <Button 
                                                onClick={() => addItem({...item, quantity: 1})}
                                                variant="outline"
                                                aria-label={`Increase quantity of ${item.name}`}
                                            > 
                                                + 
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Button 
                            onClick={() => clearCart()} 
                            variant="default" 
                            aria-label="Clear all items from cart"
                            className="w-1/2 my-8 text-xl md:text-2xl font-paragraph 
                                    bg-cyan-300/50 backdrop-blur-md text-white"
                        > 
                            « Clear Cart »
                        </Button>
                        <div>
                            <p 
                                className="font-paragraph p-2 text-2xl md:text-4xl font-bold text-white"
                                aria-live="polite"
                            >
                                Total: 
                                    <span aria-hidden="true">$</span>
                                    <span className="sr-only">Dollars</span>
                                    {(total / 100).toFixed(2)} 
                            </p>
                        </div>
                    </CardContent>
                </Card>
                {/* <form 
                    action={checkoutAction} 
                    className="w-full flex flex-col items-center justify-center mt-8"
                    aria-label="Payment form"
                >
                    <input 
                        type="hidden" 
                        name="items" 
                        value={JSON.stringify(items)} 
                        aria-hidden="true"
                    />
                    <Button 
                        type="submit" 
                        variant="default" 
                        aria-label="Proceed to payment"
                        className="w-1/2 p-8 text-xl md:text-3xl font-bold font-paragraph
                                bg-cyan-400/70 backdrop-blur-md text-black"
                    > 
                        « Proceed to Payment »
                    </Button>
                </form> */}

                 <form 
                    onSubmit={handleCheckout}
                    className="w-full flex flex-col items-center justify-center mt-8"
                    aria-label="Payment form"
                >
                    <input 
                        type="hidden" 
                        name="items" 
                        value={JSON.stringify(items)} 
                        aria-hidden="true"
                    />
                    <Button 
                        type="submit" 
                        variant="default" 
                        aria-label="Proceed to payment"
                        disabled={isProcessing}
                        className="w-1/2 p-8 text-xl md:text-3xl font-bold font-paragraph
                                bg-cyan-400/70 backdrop-blur-md text-black"
                    > 
                        {isProcessing ? "Processing..." : "« Proceed to Payment »"}
                    </Button>
                </form>
            </div>
        </main>
    )
}