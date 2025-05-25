'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { PageHeader } from '@/components/PageHeader'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { createProduct } from '@/app/products/actions'
import { useProductFormProvider } from '@/contexts/ProductFormContext'

import { TextStep } from '@/components/product-form/TextStep'
import { InformationStep } from '@/components/product-form/InformationStep'
import { ScreenshotsStep } from '@/components/product-form/ScreenshotsStep'

export default function NewProduct() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    currentStep,
    setCurrentStep,
    formData,
    clearFormData,
    clearCurrentStep,
    handleUploadImages,
    isStepValid,
    steps,
    iconFiles
  } = useProductFormProvider()

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = async () => {
    if (currentStepData.id === 'screenshots') {
      await handleUploadImages()
    }

    if (isLastStep) {
      handleSubmit()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Upload images before validation to ensure iconUrl is updated
      await handleUploadImages()

      // Verificar campos obligatorios antes de enviar
      if (!formData.name.trim() || !formData.description.trim() || !formData.iconUrl) {
        throw new Error('Los campos nombre, descripción e icono son obligatorios')
      }

      const formDataToSend = new FormData()

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'iconUrl' && key !== 'screenshotUrls') {
          formDataToSend.append(key, value as string)
        }
      })

      // Append image URLs - ensure iconUrl is not empty
      if (!formData.iconUrl) {
        throw new Error('El icono es obligatorio')
      }
      formDataToSend.append('iconUrl', formData.iconUrl)

      // Append screenshot URLs
      const screenshotUrls = formData.screenshotUrls || []
      screenshotUrls.forEach(url => {
        formDataToSend.append('screenshotUrls', url)
      })

      // Call the server action
      const result = await createProduct(formDataToSend)

      if (!result.success) {
        throw new Error(result.error || 'Error al crear el producto')
      }

      // Clear localStorage after successful submission
      clearFormData()
      clearCurrentStep()

      toast.success('¡Producto creado correctamente!')
      router.push('/products')
    } catch (error) {
      console.error('Error al crear el producto:', error)
      toast.error(error instanceof Error ? error.message : 'Error al crear el producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.layout) {
      case 'information':
        return <InformationStep />
      case 'screenshots':
        return <ScreenshotsStep />
      case 'text':
      default:
        return <TextStep stepId={currentStepData.id} />
    }
  }

  return (
    <LayoutWrapper>
      <Navbar />

      <LayoutMain>
        <PageHeader title="Añadir producto" />

        <LayoutSection>
          <LayoutContainer>
            <Card className="w-full h-[calc(100dvh-242px)] overflow-hidden">
              <Progress
                className="rounded-none h-2 bg-foreground/10"
                value={((currentStep + 1) / steps.length) * 100}
              />
              <CardHeader className="p-6 border-b">
                <CardTitle>{currentStepData.title}</CardTitle>
                <CardDescription>{currentStepData.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 overflow-y-auto">
                {renderStepContent()}
              </CardContent>
              <CardFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 p-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isFirstStep || isSubmitting}
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
                  disabled={!isStepValid() || isSubmitting}
                >
                  {isLastStep ? (
                    isSubmitting ? (
                      'Guardando...'
                    ) : (
                      <>
                        Finalizar
                        <Check size={20} />
                      </>
                    )
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