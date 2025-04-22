'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { PageHeader } from '@/components/PageHeader'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const MAX_CHARS = 300

const steps = [
  {
    id: 'problem',
    title: 'Problema',
    description: 'Describe el problema que pretende resolver tu producto',
  },
  {
    id: 'solution',
    title: 'Solución',
    description: 'Describe la solución que aporta tu producto',
  },
  {
    id: 'features',
    title: 'Funcionalidades',
    description: 'Describe las funcionalidades principales del producto',
  },
  {
    id: 'monetization',
    title: 'Monetización',
    description: 'Describe cómo monetizas el producto si aplica a tu caso',
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    description: 'Describe el plan que tienes para tu producto',
  },
  {
    id: 'technology',
    title: 'Tecnología',
    description: 'Describe la tecnología y herramientas usadas en el producto',
  },
]

export default function NewProduct() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    problem: '',
    solution: '',
    features: '',
    monetization: '',
    roadmap: '',
    technology: ''
  })

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0
  const currentValue = formData[currentStepData.id as keyof typeof formData]
  const charsRemaining = MAX_CHARS - currentValue.length
  const isOverLimit = charsRemaining < 0

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    // TODO: Handle form submission
    console.log(formData)
  }

  const handleChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setFormData(prev => ({
        ...prev,
        [currentStepData.id]: value
      }))
    }
  }

  return (
    <LayoutWrapper>
      <Navbar />

      <LayoutMain>
        <LayoutSection className="border-b py-6 bg-background">
          <LayoutContainer>
            <PageHeader
              title="Añadir producto"
              description="Comparte tu producto con la comunidad paso a paso."
            />
          </LayoutContainer>
        </LayoutSection>

        <LayoutSection>
          <LayoutContainer className="max-w-3xl">
            {/* Progress bar */}
            <div className="w-full h-2 bg-muted rounded-full mb-8">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Step content */}
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                {currentStepData.title}
              </h2>
              <p className="text-muted-foreground">
                {currentStepData.description}
              </p>
              <div className="space-y-2">
                <Textarea
                  value={currentValue}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={currentStepData.description}
                  className="min-h-[200px]"
                  maxLength={MAX_CHARS}
                />
                <div className="flex justify-end">
                  <span className={`text-sm ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {charsRemaining} caracteres restantes
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center gap-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isFirstStep}
                className="gap-2 min-w-32"
              >
                <ArrowLeft size={16} />
                Anterior
              </Button>

              <div className="flex-1 flex items-center justify-center">
                <span className="text-sm font-medium bg-muted px-4 py-2 rounded-full">
                  Paso {currentStep + 1} de {steps.length}
                </span>
              </div>

              <Button
                onClick={handleNext}
                className="gap-2 min-w-32"
                disabled={currentValue.length === 0 || isOverLimit}
              >
                {isLastStep ? (
                  <>
                    Finalizar
                    <Check size={16} />
                  </>
                ) : (
                  <>
                    Siguiente
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </div>
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>

      <Footer />
    </LayoutWrapper>
  )
} 