'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { createProduct } from '@/app/products/actions'
import { useProductFormProvider } from '@/contexts/ProductFormContext'
import { useAnalytics } from '@/hooks/useAnalytics'

import { TextStep } from '@/components/product-form/TextStep'
import { InformationStep } from '@/components/product-form/InformationStep'
import { ScreenshotsStep } from '@/components/product-form/ScreenshotsStep'

export function CreateProductForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    trackProductCreationStarted,
    trackProductCreationStep,
    trackProductCreationAbandoned,
    trackProductPublished
  } = useAnalytics()

  // Refs to track form timing
  const formStartTime = useRef<Date | null>(null)
  const stepStartTime = useRef<Date | null>(null)
  const hasTrackedStart = useRef(false)

  const {
    currentStep,
    setCurrentStep,
    formData,
    clearAllData,
    handleUploadImages,
    isStepValid,
    steps,
    iconFiles
  } = useProductFormProvider()

  // Track form creation start
  useEffect(() => {
    if (!hasTrackedStart.current) {
      formStartTime.current = new Date()
      stepStartTime.current = new Date()

      trackProductCreationStarted({
        creation_source: "dashboard", // Could be dynamic based on how user arrived
        user_products_count: 0 // Could be passed as prop if available
      })

      hasTrackedStart.current = true
    }
  }, [trackProductCreationStarted])

  // Track step changes
  useEffect(() => {
    if (stepStartTime.current && hasTrackedStart.current) {
      const timeOnPreviousStep = Date.now() - stepStartTime.current.getTime()

      trackProductCreationStep({
        step: steps[currentStep].id as any,
        step_number: currentStep + 1,
        time_on_step: Math.round(timeOnPreviousStep / 1000),
        fields_completed: getCompletedFields()
      })

      stepStartTime.current = new Date()
    }
  }, [currentStep, trackProductCreationStep])

  // Helper to get completed fields
  const getCompletedFields = () => {
    const fields = []
    if (formData.name?.trim()) fields.push('name')
    if (formData.tagline?.trim()) fields.push('tagline')
    if (formData.description?.trim()) fields.push('description')
    if (formData.link?.trim()) fields.push('link')
    if (formData.problem?.trim()) fields.push('problem')
    if (formData.solution?.trim()) fields.push('solution')
    if (formData.features?.trim()) fields.push('features')
    if (formData.monetization?.trim()) fields.push('monetization')
    if (formData.roadmap?.trim()) fields.push('roadmap')
    if (formData.technology?.trim()) fields.push('technology')
    if (formData.iconUrl || iconFiles.length > 0) fields.push('icon')
    if (formData.screenshotUrls?.length > 0) fields.push('screenshots')
    return fields
  }

  // Track form abandonment on unmount
  useEffect(() => {
    return () => {
      if (formStartTime.current && hasTrackedStart.current && !isSubmitting) {
        const totalTime = Date.now() - formStartTime.current.getTime()
        const completedFields = getCompletedFields()
        const totalFields = ['name', 'tagline', 'description', 'link', 'problem', 'solution', 'features', 'monetization', 'roadmap', 'technology', 'icon', 'screenshots']
        const completionPercentage = Math.round((completedFields.length / totalFields.length) * 100)

        trackProductCreationAbandoned({
          last_step: steps[currentStep].id,
          total_time_spent: Math.round(totalTime / 1000),
          fields_completed: completedFields,
          completion_percentage: completionPercentage
        })
      }
    }
  }, [isSubmitting, currentStep, trackProductCreationAbandoned])

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
    const submitStartTime = Date.now()

    try {
      // Upload images before validation to ensure iconUrl is updated
      await handleUploadImages()

      // Wait a bit for state to update after image upload
      await new Promise(resolve => setTimeout(resolve, 100))

      // Get the latest formData after upload
      const currentFormData = JSON.parse(localStorage.getItem('productForm_create_data') || '{}')

      // Verificar campos obligatorios antes de enviar
      if (!currentFormData.name?.trim() || !currentFormData.description?.trim() || !currentFormData.iconUrl) {
        console.log('Validation failed:', {
          name: currentFormData.name,
          description: currentFormData.description,
          iconUrl: currentFormData.iconUrl
        })
        throw new Error('Los campos nombre, descripción e icono son obligatorios')
      }

      const formDataToSend = new FormData()

      // Append all text fields
      Object.entries(currentFormData).forEach(([key, value]) => {
        if (key !== 'iconUrl' && key !== 'screenshotUrls') {
          formDataToSend.append(key, value as string)
        }
      })

      // Append image URLs - ensure iconUrl is not empty
      if (!currentFormData.iconUrl) {
        throw new Error('El icono es obligatorio')
      }
      formDataToSend.append('iconUrl', currentFormData.iconUrl)

      // Append screenshot URLs
      const screenshotUrls = currentFormData.screenshotUrls || []
      screenshotUrls.forEach((url: string) => {
        formDataToSend.append('screenshotUrls', url)
      })

      // Call the server action
      const result = await createProduct(formDataToSend)

      if (!result.success) {
        throw new Error(result.error || 'Error al crear el producto')
      }

      // Track successful product publication
      if (formStartTime.current && result.data) {
        const totalTimeToComplete = Date.now() - formStartTime.current.getTime()

        trackProductPublished({
          product_id: result.data.id,
          product_category: currentFormData.productType || 'WEB',
          product_stage: 'launched', // Default stage
          has_images: screenshotUrls.length > 0,
          has_video: false, // Not implemented yet
          description_length: currentFormData.description?.length || 0,
          tags_count: 0, // Not implemented yet
          links_count: currentFormData.link ? 1 : 0,
          time_to_complete: Math.round(totalTimeToComplete / 1000),
          is_first_product: true, // Could be dynamic if we track user's product count
          draft_saved_count: 0 // Could track localStorage saves
        })
      }

      // Clear localStorage after successful submission
      clearAllData()

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
  )
} 