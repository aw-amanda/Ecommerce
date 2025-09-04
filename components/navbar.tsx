"use client"

import { useCartStore } from "@/store/cart-store"
import { Button } from "./ui/button"
import { NavItems } from "@/lib/nav-items"
import Logo from "@/public/pâtisserie_magique_logo.png"
import Link from "next/link"
import Image from 'next/image'
import { PiShoppingCartSimpleDuotone, PiListBold, PiXFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react"

export const Navbar = ({}) => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const { items } = useCartStore()
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (mobileOpen && mobileMenuRef.current) {
            const focusableElements = mobileMenuRef.current.querySelectorAll(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            )
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0] as HTMLElement
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

                firstElement.focus()

                const handleKeyDown = (e: KeyboardEvent) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault()
                            lastElement.focus()
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault()
                            firstElement.focus()
                        }
                    } else if (e.key === 'Escape') {
                        setMobileOpen(false)
                        menuButtonRef.current?.focus()
                    }
                }

                document.addEventListener('keydown', handleKeyDown)
                return () => document.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [mobileOpen])

    return (
        <header>
            <nav 
                aria-label="Main navigation"
                className="sticky top-0 z-100 bg-black/70 backdrop-blur-md shadow-md"
            >
                <div className="container mx-auto py-3 px-6 flex items-center justify-between w-full h-28">

                    {/* Logo */}
                    <div className="relative p-2 mx-3">
                        <Link 
                            href="/"
                            className="p-1 cursor-pointer"
                            aria-label="Pâtisserie Magique Logo - Return to home page"
                        >   
                            <Image 
                                src={Logo} 
                                alt=""
                                width={80}
                                height={80}
                                aria-hidden="true" 
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6 text-2xl lg:text-3xl gap-4">
                        {NavItems.map((navItem, index) => (
                            <Link
                                key={`desktop-${index}`}
                                href={navItem.link}
                                className="text-cyan-400 hover:text-cyan-100 transition-colors font-heading"
                            >
                                {navItem.item}
                            </Link>
                        ))}
                    </div>

                    {/* Cart */}
                    <div className="flex items-center space-x-4">
                        <Link 
                            href="/checkout" 
                            className="relative p-2 mx-3 rounded-full"
                            aria-label={`Shopping cart with ${cartCount} items`}
                        >
                            <PiShoppingCartSimpleDuotone
                                className="h-10 w-10 text-cyan-400"
                                aria-hidden="true"
                            />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center 
                                              bg-gray-50/90 rounded-full font-bold text-sm text-cyan-400"
                                >
                                    <span className="sr-only">Cart items:</span>
                                    {cartCount} 
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <Button 
                            variant="ghost"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="md:hidden h-20 w-20"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            ref={menuButtonRef}
                        >
                            {mobileOpen ? (<PiXFill
                                                className="text-cyan-400" 
                                                aria-hidden="true"
                                                style={{height: "30px", width: "30px"}}
                                            />
                            ) : (
                                <PiListBold
                                    className="text-cyan-400"
                                    aria-hidden="true"
                                    style={{height: "30px", width: "30px"}}
                                />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <nav 
                        id="mobile-menu"
                        ref={mobileMenuRef}
                        className="md:hidden bg-black/70 backdrop-blur-md shadow-md"
                        role="dialog"
                        aria-modal="true"
                    >
                        <ul className="flex flex-col p-4 space-y-2">
                            {NavItems.map((navItem, index) => (
                                <li key={`mobile-${index}`}>
                                    <Link
                                        href={navItem.link}
                                        className="block m-2 text-cyan-400 focus:text-cyan-300 font-paragraph 
                                                  text-2xl transition-colors"
                                        aria-current={typeof window !== 'undefined' && 
                                            window.location.pathname === navItem.link ? 
                                            "page" : undefined
                                        }
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {navItem.item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </nav>
        </header>
    )
}