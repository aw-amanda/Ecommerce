"use client"

import { FormEvent, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import contactBG from "@/public/contactBG.png"

interface FormData {
  name: string
  phone: string
  email: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // simulation
      await new Promise(resolve => setTimeout(resolve, 1500))
      const isSuccess = Math.random() > 0.3; // 70%
      
      if (isSuccess) {
        setSubmitStatus({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.'
        })
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        })
      } else {
        setSubmitStatus({
          success: false,
          message: 'Something went wrong. Please try again later.'
        })
        formRef.current?.focus()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed'
      setSubmitStatus({
        success: false,
        message: `An unexpected error occurred: ${errorMessage} Please try again.`
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main 
      className="w-full min-h-screen flex flex-col items-center justify-start pt-12"
      aria-labelledby="contact heading"
    >
      <div 
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
            src={contactBG}
            alt=""
            fill
            className="object-cover"
            priority
        />
      </div>
      <div className="w-full max-w-4xl">
        <h1 
          id="contact-heading"
          className="text-6xl md:text-8xl font-bold text-center text-shadow-lg text-cyan-400 mb-5 font-heading"
          tabIndex={-1}
        >
          Contact Us
        </h1>
          
        <Card 
          className="w-3/4 md:w-4/5 mx-auto shadow-lg bg-black/70 backdrop-blur-md 
                    font-paragraph text-white border-none rounded-2xl"
          role="region"
          aria-labelledby="contact-form heading"
        >
          <CardContent className="p-6">
            {submitStatus && (
              <div 
                role="alert"
                aria-live="assertive"
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.success 
                  ? 'bg-gray-300 text-emerald-600' 
                  : 'bg-gray-300 text-red-800'
                }`}
              >
                  {submitStatus.message}
              </div>
            )}

            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-6"
              aria-labelledby="contact-form"
            >
              <div className="space-y-2">
                <label 
                  htmlFor="name" 
                  className="block text-lg"
                  id="name-label"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First and Last Name"
                  required
                  disabled={isSubmitting}
                  aria-labelledby="name-label"
                  aria-required="true"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                          disabled:bg-gray-100 disabled:opacity-75 transition"
                />
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="phone" 
                  className="block text-lg"
                  id="phone-label"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(000) 000-0000"
                  disabled={isSubmitting}
                  aria-labelledby="phone-label"
                  inputMode="tel"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                            disabled:bg-gray-100 disabled:opacity-75 transition"
                />
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-lg"
                  id="email-label"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@address.com"
                  required
                  disabled={isSubmitting}
                  aria-labelledby="email-label"
                  aria-required="true"
                  inputMode="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                            disabled:bg-gray-100 disabled:opacity-75 transition"
                />
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="message" 
                  className="block text-lg"
                  id="message-label"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  aria-labelledby="message-label"
                  aria-required="true"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                            focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                            disabled:bg-gray-100 disabled:opacity-75 transition"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full bg-cyan-400/70 backdrop-blur-md hover:bg-cyan-300 py-3 px-4 rounded-lg
                        text-white text-lg md:text-xl font-bold transition-colors 
                          disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                    Sending...
                </span>
                ) : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}