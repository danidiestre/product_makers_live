'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { updateProduct } from '@/app/products/actions'
import { useProductFormProvider } from '@/contexts/ProductFormContext'

import { TextStep } from '@/components/product-form/TextStep'
import { InformationStep } from '@/components/product-form/InformationStep'
import { ScreenshotsStep } from '@/components/product-form/ScreenshotsStep'

interface Product {
  id: string
  name: string
  tagline?: string
  description: string
  imageUrl?: string
  screenshots?: string[]
  externalLinks?: {
    website?: string
  }
  problem?: string
  solution?: string
  features?: string
  monetization?: string
  roadmap?: string
  technology?: string
  productType?: string
}

interface EditProductFormProps {
  product: Product
  productId: string
}

export function EditProductForm({ product, productId }: EditProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const hasLoadedData = useRef(false)

  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    clearAllData,
    handleUploadImages,
    isStepValid,
    steps,
  } = useProductFormProvider()

  // Load existing product data once when component mounts
  useEffect(() => {
    // Prevent loading data multiple times or if product is not available
    if (hasLoadedData.current || !product?.id) return

    const loadProductData = () => {
      try {
        setIsLoading(true)

        // Set form data with existing product data
        const newFormData = {
          name: product.name || '',
          tagline: product.tagline || '',
          description: product.description || '',
          link: product.externalLinks?.website || '',
          problem: product.problem || '',
          solution: product.solution || '',
          features: product.features || '',
          monetization: product.monetization || '',
          roadmap: product.roadmap || '',
          technology: product.technology || '',
          productType: product.productType || 'WEB',
          iconUrl: product.imageUrl || '',
          screenshotUrls: product.screenshots || []
        }

        // Use the setFormData function directly without depending on it
        setFormData(newFormData)
        hasLoadedData.current = true
      } catch (error) {
        console.error('Error loading product data:', error)
        toast.error('Error al cargar el producto')
        router.push('/products')
      } finally {
        setIsLoading(false)
      }
    }

    loadProductData()
  }, []) // Empty dependency array - only run once on mount

  // Reset loading flag when product ID changes (for navigation between products)
  useEffect(() => {
    if (hasLoadedData.current && product?.id) {
      hasLoadedData.current = false
    }
  }, [product?.id])

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

      // Wait a bit for state to update after image upload
      await new Promise(resolve => setTimeout(resolve, 100))

      // Get the latest formData after upload
      const currentFormData = JSON.parse(localStorage.getItem(`productForm_edit_${productId}_data`) || '{}')

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

      // Add product ID
      formDataToSend.append('id', productId)

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
      const result = await updateProduct(formDataToSend)

      if (!result.success) {
        throw new Error(result.error || 'Error al actualizar el producto')
      }

      // Clear localStorage after successful submission
      clearAllData()

      toast.success('¡Producto actualizado correctamente!')
      router.push('/products')
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
      toast.error(error instanceof Error ? error.message : 'Error al actualizar el producto')
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    )
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
                Actualizar
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