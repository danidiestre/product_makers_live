'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { PageHeader } from '@/components/PageHeader'
import { CircleUserRound, X, ArrowLeft, ArrowRight, Check, Image as ImageIcon, AlertCircle, Upload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useFileUpload } from '@/hooks/use-file-upload'
import { formatBytes } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const MAX_CHARS = 300
const MAX_FILE_SIZE_MB = 5
const MAX_SCREENSHOTS = 6

const steps = [
  {
    id: 'information',
    title: 'Información',
    description: 'La información básica de tu producto',
    layout: 'information'
  },
  {
    id: 'screenshots',
    title: 'Capturas de pantalla',
    description: 'Añade capturas de pantalla de tu producto',
    layout: 'screenshots'
  },
  {
    id: 'problem',
    title: 'Problema',
    description: 'Describe el problema que pretende resolver tu producto',
    layout: 'text'
  },
  {
    id: 'solution',
    title: 'Solución',
    description: 'Describe la solución que aporta tu producto',
    layout: 'text'
  },
  {
    id: 'features',
    title: 'Funcionalidades',
    description: 'Describe las funcionalidades principales del producto',
    layout: 'text'
  },
  {
    id: 'monetization',
    title: 'Monetización',
    description: 'Describe cómo monetizas el producto si aplica a tu caso',
    layout: 'text'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    description: 'Describe el plan que tienes para tu producto',
    layout: 'text'
  },
  {
    id: 'technology',
    title: 'Tecnología',
    description: 'Describe la tecnología y herramientas usadas en el producto',
    layout: 'text'
  },
]

export default function NewProduct() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    link: '',
    icon: null as File | null,
    screenshots: [] as File[],
    problem: '',
    solution: '',
    features: '',
    monetization: '',
    roadmap: '',
    technology: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // File upload for screenshots
  const [
    { files: screenshotFiles, isDragging, errors: screenshotErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    multiple: true,
    maxFiles: MAX_SCREENSHOTS,
  })

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0
  const currentValue = formData[currentStepData.id as keyof typeof formData]
  const charsRemaining = MAX_CHARS - (typeof currentValue === 'string' ? currentValue.length : 0)
  const isOverLimit = charsRemaining < 0

  const [
    { files: iconFiles },
    {
      removeFile: removeIconFile,
      openFileDialog: openIconDialog,
      getInputProps: getIconInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxFiles: 1, // Only allow one file for the icon
  })

  const handleNext = () => {
    if (currentStepData.id === 'screenshots') {
      // Save screenshots before proceeding
      setFormData(prev => ({
        ...prev,
        screenshots: screenshotFiles
          .map(file => file.file)
          .filter((f): f is File => f instanceof File)
      }))
    }

    if (isLastStep) {
      handleSubmit()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData()

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'screenshots' && typeof value === 'string') {
          formDataToSend.append(key, value)
        }
      })

      // Append icon if exists
      if (iconFiles.length > 0 && iconFiles[0].file instanceof File) {
        formDataToSend.append('icon', iconFiles[0].file)
      }

      // Append screenshots
      formData.screenshots.forEach((file, index) => {
        formDataToSend.append(`screenshots`, file)
      })

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend,
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Error al crear el producto')
      }

      toast.success('¡Producto creado correctamente!')
      router.push('/products')
    } catch (error) {
      console.error('Error al crear el producto:', error)
      toast.error(error instanceof Error ? error.message : 'Error al crear el producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentStepData.id]: value
    }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        icon: e.target.files![0]
      }))
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.layout) {
      case 'information':
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex flex-col gap-3">
                <Label>Icono</Label>
                <div className="flex flex-col items-start gap-2">
                  <div className="relative inline-flex">
                    <Button
                      variant="outline"
                      className="relative size-32 overflow-hidden p-0 shadow-none"
                      onClick={() => {
                        // Clear any existing files first
                        if (iconFiles.length > 0) {
                          removeIconFile(iconFiles[0].id)
                        }
                        openIconDialog()
                      }}
                      aria-label={iconFiles[0]?.preview ? "Cambiar imagen" : "Subir imagen"}
                    >
                      {iconFiles[0]?.preview ? (
                        <img
                          className="size-full object-cover rounded-lg"
                          src={iconFiles[0].preview}
                          alt="Vista previa del icono"
                          width={128}
                          height={128}
                        />
                      ) : (
                        <div aria-hidden="true">
                          <CircleUserRound className="size-8 opacity-60" />
                        </div>
                      )}
                    </Button>
                    {iconFiles[0]?.preview && (
                      <Button
                        onClick={() => removeIconFile(iconFiles[0].id)}
                        size="icon"
                        className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                        aria-label="Eliminar imagen"
                      >
                        <X className="size-3.5" />
                      </Button>
                    )}
                    <input
                      {...getIconInputProps()}
                      className="sr-only"
                      aria-label="Subir archivo de imagen"
                      tabIndex={-1}
                    />
                  </div>
                  {iconFiles[0]?.file.name && (
                    <p className="text-muted-foreground text-xs hidden">{iconFiles[0].file.name}</p>
                  )}
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="w-full flex flex-col gap-3">
                  <Label htmlFor="name">Nombre de la aplicación</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: Mi App"
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleInputChange}
                    placeholder="Una breve descripción (max 60 caracteres)"
                    maxLength={60}
                  />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Describe tu aplicación en detalle"
                    rows={3}
                  />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <Label htmlFor="link">Enlace a la aplicación</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="https://tuaplicacion.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'screenshots':
        return (
          <div className="flex flex-col gap-2">
            {/* Drop area */}
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              data-dragging={isDragging || undefined}
              data-files={screenshotFiles.length > 0 || undefined}
              className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
            >
              <input
                {...getInputProps()}
                className="sr-only"
                aria-label="Upload image file"
              />
              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                <div
                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <ImageIcon className="size-4 opacity-60" />
                </div>
                <p className="mb-1.5 text-sm font-medium">Arrastra tus imágenes aquí</p>
                <p className="text-muted-foreground text-xs">
                  SVG, PNG, JPG o GIF (max. {MAX_FILE_SIZE_MB}MB)
                </p>
                <Button variant="outline" className="mt-4 gap-2" onClick={openFileDialog}>
                  <Upload size={20} aria-hidden="true" />
                  Seleccionar imágenes
                </Button>
              </div>
            </div>

            {screenshotErrors.length > 0 && (
              <div
                className="text-destructive flex items-center gap-1 text-xs"
                role="alert"
              >
                <AlertCircle className="size-3 shrink-0" />
                <span>{screenshotErrors[0]}</span>
              </div>
            )}

            {/* File list */}
            {screenshotFiles.length > 0 && (
              <div className="space-y-2">
                {screenshotFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-accent aspect-square shrink-0 rounded">
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="size-10 rounded-[inherit] object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="truncate text-[13px] font-medium">
                          {file.file.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatBytes(file.file.size)}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                      onClick={() => removeFile(file.id)}
                      aria-label="Remove file"
                    >
                      <X aria-hidden="true" />
                    </Button>
                  </div>
                ))}

                {/* Remove all files button */}
                {screenshotFiles.length > 1 && (
                  <div>
                    <Button size="sm" variant="outline" onClick={clearFiles}>
                      Eliminar todas
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      case 'text':
      default:
        return (
          <div className="flex flex-col gap-2">
            <Textarea
              rows={6}
              value={currentValue as string}
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
        )
    }
  }

  const isStepValid = () => {
    switch (currentStepData.id) {
      case 'information':
        return formData.name.trim() !== '' &&
          formData.tagline.trim() !== '' &&
          formData.description.trim() !== '' &&
          formData.link.trim() !== '' &&
          iconFiles.length > 0
      case 'screenshots':
        return screenshotFiles.length > 0
      default:
        return (currentValue as string).length > 0 && !isOverLimit
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
              <Progress className="rounded-none h-2 bg-foreground/10" value={((currentStep + 1) / steps.length) * 100} />
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