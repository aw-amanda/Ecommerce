// "use server"

// import { stripe } from "@/lib/stripe"
// import { CartItem } from "@/store/cart-store"
// import { redirect } from "next/navigation"

// export const checkoutAction = async(formData: FormData): Promise<void> => {
//     const itemsJson = formData.get("items") as string
//     const items = JSON.parse(itemsJson)
//     const line_items = items.map((item: CartItem) => ({
//         price_data: {
//             currency: "USD",
//             product_data: {name: item.name},
//             unit_amount: item.price,
//         },
//         quantity: item.quantity,
//     }))

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items, 
//         mode: "payment",
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout_success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,

//     })

//     redirect(session.url!)
// }

export const checkoutAction = async (formData: FormData): Promise<void> => {
  // Client-side mock implementation for static export
  console.log("Checkout simulation (static export mode)")
  alert("Checkout functionality is disabled in demo mode. This would redirect to payment processing in a live environment.")
  
  // For static export, use window.location for a basic demo
  if (typeof window !== 'undefined') {
    window.location.href = "/checkout_success"
  }
}