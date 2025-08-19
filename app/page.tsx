import { stripe } from "@/lib/stripe"
import Link from "next/link"
import Image from "next/image"
import heroBG from "@/public/heroBG.png"
import { Carousel } from "@/components/ui/carousel"

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  })

  return (
    <section 
      id="home"
      className="w-full min-h-[calc(100vh-4rem)] pt-4"
      aria-labelledby="main-heading"
      role="region"
    >
      <div 
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
            src={heroBG}
            alt=""
            fill
            className="object-cover"
            priority
        />
      </div>
      <div 
        className="relative flex flex-col items-center px-5 py-10"
        role="heading"
      >
        <div className="text-center bg-black/75 backdrop-blur-md rounded-2xl mx-8 md:mx-32">
            <h1 
              className="text-5xl md:text-9xl p-4 text-cyan-400 font-heading text-shadow-lg"
              id="main-heading"
              tabIndex={-1}
            >
              Pâtisserie Magique
            </h1>
            <div className="flex justify-center mt-2 md:mt-8">
                <Link 
                  href="/products" 
                  className="w-full cursor-pointer"
                  aria-label="View our featured pastry products"
                >
                  <Carousel 
                    products={products.data}
                    aria-roledescription="carousel"
                    aria-label="Featured products carousel"
                  />
                </Link>
            </div>
            <div className="pt-0 mt-0 bg-black/80 rounded-b-2xl text-left">
              <p className="text-white text-shadow-2xl text-xl md:text-2xl tracking-wide font-paragraph px-10 py-8">
                At Pâtisserie Magique, our gourmet Parisian-inspired pastries are crafted with precision and passion, 
                from delicate, hand-piped macaroons in vibrant flavors to opulent custom cakes. Using only the finest 
                ingredients, including premium Valrhona chocolate, Madagascar vanilla, and seasonal organic fruits, 
                we transform traditional pâtisserie into edible art. 
                <br />
                <br />
                Whether you seek elegant wedding cakes, 
                buttery made-to-order cookies, or our signature jewel-toned macaroons, each creation is a 
                celebration of luxury and craftsmanship. Elevate your gatherings, gifting, 
                or everyday moments with Pâtisserie Magique—where every detail is <em>magnifique</em>.
              </p>
              <div id="main-content" tabIndex={-1} className="sr-only" />
            </div>
        </div>
      </div>
    </section>
  )
}