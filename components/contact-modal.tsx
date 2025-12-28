"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.from.trim()) {
      setError("Email is required")
      return
    }
    if (!validateEmail(formData.from)) {
      setError("Please enter a valid email address")
      return
    }
    if (!formData.subject.trim()) {
      setError("Subject is required")
      return
    }
    if (!formData.message.trim()) {
      setError("Message is required")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbwflRftR7KO0wiLvRUzG-9XlIP4zsfnsQPwAQuzn4y1plhUzbvYW2xuMp1ZkwWo1HxGKA/exec"

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors mode
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: formData.from,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      // Note: With no-cors, we can't read the response, so we assume success
      setIsSuccess(true)
      setFormData({ from: "", subject: "", message: "" })

      // Auto-close after 3 seconds on success
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (err) {
      console.error("[v0] Contact form error:", err)
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ from: "", subject: "", message: "" })
    setError("")
    setIsSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-background rounded-xl sm:rounded-2xl border border-border shadow-2xl my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {isSuccess ? "Message Sent!" : "Contact Support"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-card rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                Your message has been sent successfully!
              </h3>
              <p className="text-sm sm:text-base text-foreground/70">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* From Email */}
              <div className="space-y-2">
                <Label htmlFor="from" className="text-sm sm:text-base font-medium text-foreground">
                  From: <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="from"
                  name="from"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="min-h-[44px] text-base"
                  required
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm sm:text-base font-medium text-foreground">
                  Subject: <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="min-h-[44px] text-base"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm sm:text-base font-medium text-foreground">
                  Message: <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px] sm:min-h-[150px] resize-none text-base"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 sm:p-4">
                  <p className="text-sm text-destructive text-center">{error}</p>
                </div>
              )}

              {/* Send Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] sm:min-h-[48px] text-base sm:text-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs sm:text-sm text-foreground/60 text-center">
                Your message will be sent to our support team at cwagoventures@gmail.com
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
