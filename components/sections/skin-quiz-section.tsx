"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  key: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your main skin concern?",
    options: ["Oily & clogged pores", "Dull appearance", "Dryness", "Sensitivity"],
    key: "concern",
  },
  {
    id: 2,
    question: "How often do you experience oiliness?",
    options: ["By midday", "By evening", "Throughout the day", "Rarely"],
    key: "oiliness",
  },
  {
    id: 3,
    question: "What's your current skincare routine?",
    options: ["Just cleanser", "Cleanser + moisturizer", "Full routine (5+ steps)", "Minimal care"],
    key: "routine",
  },
  {
    id: 4,
    question: "What's your budget for skincare?",
    options: ["Budget-friendly", "Mid-range", "Premium", "Any for results"],
    key: "budget",
  },
]

const recommendationBundles = {
  bundle1: {
    name: "Volcanic Starter Bundle",
    price: "₱1,999",
    originalPrice: "₱2,747",
    savings: "27% OFF",
    items: ["Volcanic Mud Scrub (200ml)", "Hydrating Cream (50ml)", "Cleansing Oil (100ml)"],
  },
  bundle2: {
    name: "Complete Glow Routine",
    price: "₱4,499",
    originalPrice: "₱6,196",
    savings: "27% OFF",
    items: [
      "Volcanic Mud Scrub (200ml)",
      "Brightening Serum (30ml)",
      "Hydrating Cream (50ml)",
      "Cleansing Oil (100ml)",
      "Toner (150ml)",
    ],
  },
  bundle3: {
    name: "Volcanic Intensive",
    price: "₱2,799",
    originalPrice: "₱3,746",
    savings: "25% OFF",
    items: ["Volcanic Mud Scrub (200ml) x2", "Toner (150ml)", "Hydrating Cream (50ml)"],
  },
}

export function SkinQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (option: string) => {
    const question = quizQuestions[currentQuestion]
    const newAnswers = { ...answers, [question.key]: option }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setShowResult(false)
    setAnswers({})
  }

  const getRecommendedBundle = () => {
    const concern = answers.concern
    const routine = answers.routine

    if (routine === "Full routine (5+ steps)") {
      return "bundle2"
    } else if (concern === "Dull appearance") {
      return "bundle2"
    } else {
      return "bundle1"
    }
  }

  if (showResult) {
    const bundleKey = getRecommendedBundle() as keyof typeof recommendationBundles
    const bundle = recommendationBundles[bundleKey]

    return (
      <section className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Your Perfect Bundle</h2>
          <p className="text-lg text-foreground/70 mb-12">
            Based on your skin type and concerns, we recommend this personalized routine
          </p>

          <div className="bg-background rounded-lg border border-primary/50 p-8 mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
              {bundle.savings}
            </span>
            <h3 className="text-3xl font-bold text-foreground mb-4">{bundle.name}</h3>

            <div className="flex items-baseline gap-2 justify-center mb-6">
              <span className="text-4xl font-bold text-primary">{bundle.price}</span>
              <span className="text-lg text-foreground/50 line-through">{bundle.originalPrice}</span>
            </div>

            <div className="text-left space-y-3 mb-8 inline-block">
              {bundle.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-primary/30 text-foreground h-12 px-8 bg-transparent">
                View Details
              </Button>
            </div>

            <button
              onClick={resetQuiz}
              className="mt-6 text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-2 mx-auto"
            >
              Take quiz again <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-foreground/70">
            Want to customize your bundle?{" "}
            <a href="#products" className="text-primary hover:underline font-semibold">
              Browse all products
            </a>
          </p>
        </div>
      </section>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <section className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            PERSONALIZED RECOMMENDATION
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Find Your <span className="text-primary">Perfect Skincare</span> Bundle
          </h2>
          <p className="text-lg text-foreground/70">Quick quiz to recommend the best products for your skin</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-foreground/70">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8 bg-background rounded-lg p-8 border border-border/50">
          <h3 className="text-2xl font-bold text-foreground mb-8">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left rounded-lg border-2 border-border/50 bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
              >
                <span className="text-foreground font-medium group-hover:text-primary">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skip/Back buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1)
              }
            }}
            className="text-foreground/70 hover:text-foreground font-semibold text-sm"
          >
            {currentQuestion > 0 ? "← Previous" : ""}
          </button>
          <button
            onClick={() => setShowResult(true)}
            className="text-foreground/70 hover:text-primary font-semibold text-sm"
          >
            Skip to results
          </button>
        </div>
      </div>
    </section>
  )
}
