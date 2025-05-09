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
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

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

        <PageHeader title="Añadir producto" />

        <LayoutSection>
          <LayoutContainer>

            <Card className="w-full h-full overflow-hidden">
              <Progress className="rounded-none h-2 bg-foreground/10" value={((currentStep + 1) / steps.length) * 100} />
              <CardHeader>
                <CardTitle>{currentStepData.title}</CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <Textarea
                    rows={6}
                    value={currentValue}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder=""
                    maxLength={MAX_CHARS}
                  />
                  <div className="flex justify-end">
                    <span className={`text-sm ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {charsRemaining} caracteres restantes
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 pb-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="w-auto gap-2 pl-3 justify-self-start"
                >
                  <ArrowLeft size={20} />
                  Anterior
                </Button>

                <div className="w-full text-sm font-medium h-10 flex items-center justify-center text-muted-foreground cursor-default">
                  Paso {currentStep + 1} de {steps.length}
                </div>

                <Button
                  onClick={handleNext}
                  className="w-auto gap-2 pr-3 justify-self-end"
                  disabled={currentValue.length === 0 || isOverLimit}
                >
                  {isLastStep ? (
                    <>
                      Finalizar
                      <Check size={20} />
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>

      <Footer />
    </LayoutWrapper>
  )
} 