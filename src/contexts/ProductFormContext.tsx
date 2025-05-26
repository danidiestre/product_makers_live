'use client'

import { createContext, useContext, useState, useEffect, ReactNode, DragEvent, useRef, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useFileUpload, type FileMetadata as FileUploadMetadata } from '@/hooks/use-file-upload'
import { toast } from 'sonner'

// Constants
const MAX_CHARS = 300
const MAX_FILE_SIZE_MB = 5
const MAX_SCREENSHOTS = 6

// Types
export interface FormData {
  name: string;
  tagline: string;
  description: string;
  link: string;
  problem: string;
  solution: string;
  features: string;
  monetization: string;
  roadmap: string;
  technology: string;
  iconUrl: string;
  screenshotUrls: string[];
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

export interface FileWithPreview {
  id: string;
  file: File | FileMetadata;
  preview: string | undefined;
}

export const steps = [
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

// File upload utility function
async function uploadFile(file: File) {
  try {
    if (!file || !(file instanceof File)) {
      console.error('Archivo inválido:', file)
      return { success: false, error: 'Archivo inválido' }
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }))
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json().catch(() => ({ success: false, error: 'Error al procesar respuesta' }))

    if (!data.success || !data.url) {
      return { success: false, error: data.error || 'No se pudo obtener URL' }
    }

    return data
  } catch (error) {
    console.error('Error al subir archivo:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

// Context type
interface ProductFormContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  clearCurrentStep: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  clearFormData: () => void;
  clearAllData: () => void;
  steps: typeof steps;
  handleChange: (value: string, fieldId?: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleUploadImages: () => Promise<void>;
  isUploading: boolean;
  isStepValid: () => boolean;
  // Icon upload
  iconFiles: FileWithPreview[];
  removeIconFile: (id: string) => void;
  openIconDialog: () => void;
  getIconInputProps: () => Record<string, any>;
  // Screenshot upload
  screenshotFiles: FileWithPreview[];
  isDragging: boolean;
  screenshotErrors: string[];
  handleDragEnter: (e: DragEvent<Element>) => void;
  handleDragLeave: (e: DragEvent<Element>) => void;
  handleDragOver: (e: DragEvent<Element>) => void;
  handleDrop: (e: DragEvent<Element>) => void;
  openFileDialog: () => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  getInputProps: () => Record<string, any>;
  screenshots: File[];
  maxChars: number;
  getCharsRemaining: (value: string) => number;
  isOverLimit: (value: string) => boolean;
}

// Create context
const ProductFormContext = createContext<ProductFormContextType | undefined>(undefined)

// Provider component
export function ProductFormProvider({ children, mode = 'create', productId }: {
  children: ReactNode
  mode?: 'create' | 'edit'
  productId?: string
}) {
  const [isUploading, setIsUploading] = useState(false)

  // Initial form data
  const initialFormData: FormData = {
    name: '',
    tagline: '',
    description: '',
    link: '',
    problem: '',
    solution: '',
    features: '',
    monetization: '',
    roadmap: '',
    technology: '',
    iconUrl: '',
    screenshotUrls: []
  }

  // Generate unique keys based on mode and productId
  const stepKey = mode === 'edit' && productId
    ? `productForm_edit_${productId}_currentStep`
    : 'productForm_create_currentStep'

  const dataKey = mode === 'edit' && productId
    ? `productForm_edit_${productId}_data`
    : 'productForm_create_data'

  // Use localStorage hooks with dynamic keys
  const [currentStep, setCurrentStep, clearCurrentStep] = useLocalStorage<number>(stepKey, 0)
  const [formData, setFormDataInternal, clearFormData] = useLocalStorage<FormData>(dataKey, initialFormData)

  // Wrapper for setFormData - using useCallback to prevent re-renders
  const setFormData = useCallback((data: FormData) => {
    setFormDataInternal(data)
  }, [setFormDataInternal])

  // Function to clear all localStorage data for this specific mode/product
  const clearAllData = useCallback(() => {
    clearFormData()
    clearCurrentStep()

    // Also clear any other related localStorage keys for this mode/product
    if (typeof window !== 'undefined') {
      if (mode === 'edit' && productId) {
        // Clear edit-specific keys
        localStorage.removeItem(`productForm_edit_${productId}_currentStep`)
        localStorage.removeItem(`productForm_edit_${productId}_data`)
      } else {
        // Clear create-specific keys
        localStorage.removeItem('productForm_create_currentStep')
        localStorage.removeItem('productForm_create_data')
      }
    }
  }, [clearFormData, clearCurrentStep, mode, productId])

  // Local state for screenshots (can't be stored in localStorage)
  const [screenshots, setScreenshots] = useState<File[]>([])

  // State to track restored files from localStorage
  const [restoredScreenshots, setRestoredScreenshots] = useState<FileWithPreview[]>([])
  const [restoredIcon, setRestoredIcon] = useState<FileWithPreview | null>(null)

  // Refs to track previous values and prevent infinite loops
  const prevScreenshotUrls = useRef<string[]>([])
  const prevIconUrl = useRef<string>('')

  // Convert saved URLs to FileMetadata for initial files
  const getInitialScreenshotFiles = (): FileUploadMetadata[] => {
    if (!formData.screenshotUrls || formData.screenshotUrls.length === 0) {
      return []
    }

    return formData.screenshotUrls.map((url, index) => ({
      id: `restored-${index}-${Date.now()}`,
      name: `screenshot-${index + 1}.jpg`,
      size: 0, // Unknown size for restored files
      type: 'image/jpeg',
      url: url
    }))
  }

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
      addFiles: addScreenshotFiles,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,image/webp,image/avif",
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    multiple: true,
    maxFiles: MAX_SCREENSHOTS,
    initialFiles: getInitialScreenshotFiles(),
  })

  // Update screenshots whenever screenshotFiles changes
  useEffect(() => {
    const files = screenshotFiles
      .map(file => file.file)
      .filter((f): f is File => f instanceof File)

    setScreenshots(files)
  }, [screenshotFiles])

  // Sync screenshot files when formData.screenshotUrls changes (from localStorage)
  useEffect(() => {
    const savedUrls = formData.screenshotUrls || []

    // Only restore if URLs have actually changed
    const urlsChanged = JSON.stringify(savedUrls) !== JSON.stringify(prevScreenshotUrls.current)

    if (urlsChanged) {
      prevScreenshotUrls.current = savedUrls

      if (savedUrls.length > 0) {
        // Create restored files from saved URLs
        const restored = savedUrls.map((url, index) => ({
          id: `restored-screenshot-${index}-${Date.now()}`,
          file: {
            name: `screenshot-${index + 1}.jpg`,
            size: 0,
            type: 'image/jpeg'
          } as FileMetadata,
          preview: url
        }))

        setRestoredScreenshots(restored)
      } else {
        setRestoredScreenshots([])
      }
    }
  }, [formData.screenshotUrls])

  // Convert saved icon URL to FileMetadata for initial file
  const getInitialIconFile = (): FileUploadMetadata[] => {
    if (!formData.iconUrl) {
      return []
    }

    return [{
      id: `icon-restored-${Date.now()}`,
      name: 'icon.jpg',
      size: 0, // Unknown size for restored file
      type: 'image/jpeg',
      url: formData.iconUrl
    }]
  }

  // File upload for icon
  const [
    { files: iconFiles },
    {
      removeFile: removeIconFile,
      openFileDialog: openIconDialog,
      getInputProps: getIconInputProps,
      clearFiles: clearIconFiles,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxFiles: 1, // Only allow one file for the icon
    initialFiles: getInitialIconFile(),
  })

  // Sync icon file when formData.iconUrl changes (from localStorage)
  useEffect(() => {
    const savedIconUrl = formData.iconUrl

    // Only restore if the URL has actually changed
    if (savedIconUrl !== prevIconUrl.current) {
      prevIconUrl.current = savedIconUrl

      if (savedIconUrl) {
        // Create restored icon from saved URL
        const restored = {
          id: `restored-icon-${Date.now()}`,
          file: {
            name: 'icon.jpg',
            size: 0,
            type: 'image/jpeg'
          } as FileMetadata,
          preview: savedIconUrl
        }

        setRestoredIcon(restored)
      } else {
        setRestoredIcon(null)
      }
    }
  }, [formData.iconUrl])



  // Form field handlers
  const handleChange = (value: string, fieldId?: string) => {
    setFormData({
      ...formData,
      [fieldId || steps[currentStep].id]: value
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Upload images to server
  const handleUploadImages = async () => {
    const currentUrls = formData.screenshotUrls || []

    // Check if we have new icon file to upload (not from localStorage)
    const hasNewIcon = iconFiles.length > 0 && iconFiles[0].file instanceof File && !formData.iconUrl

    // Check if we have new screenshots to upload (not from localStorage)
    const hasNewScreenshots = screenshots.length > 0 && currentUrls.length < screenshots.length

    // Skip if no new files to upload
    if (!hasNewIcon && !hasNewScreenshots) {
      return
    }

    setIsUploading(true)

    try {
      // Upload icon if new
      if (hasNewIcon) {
        const result = await uploadFile(iconFiles[0].file as File)
        if (result.success && result.url) {
          setFormData({
            ...formData,
            iconUrl: result.url
          })
        } else {
          toast.error('Error al subir el icono: ' + (result.error || 'Desconocido'))
        }
      }

      // Upload new screenshots
      if (screenshots.length > 0) {
        const newScreenshots = screenshots.filter((_, index) => index >= currentUrls.length)

        if (newScreenshots.length > 0) {
          // Upload in batches to avoid overloading the server
          const batchSize = 3
          let successCount = 0
          let failedCount = 0
          let newUrls: string[] = []

          for (let i = 0; i < newScreenshots.length; i += batchSize) {
            const batch = newScreenshots.slice(i, i + batchSize)
            const uploadPromises = batch.map(file => uploadFile(file))

            try {
              const results = await Promise.all(uploadPromises)

              // Process batch results
              const batchUrls = results
                .filter((result): result is { success: true, url: string } =>
                  result.success === true && typeof result.url === 'string')
                .map(result => result.url)

              successCount += batchUrls.length
              failedCount += results.filter(r => !r.success || !r.url).length
              newUrls = [...newUrls, ...batchUrls]
            } catch (error) {
              console.error('Error en lote de subida:', error)
              failedCount += batch.length
            }

            // Small pause between batches
            if (i + batchSize < newScreenshots.length) {
              await new Promise(resolve => setTimeout(resolve, 500))
            }
          }

          // Update state with new URLs
          if (newUrls.length > 0) {
            setFormData({
              ...formData,
              screenshotUrls: [...currentUrls, ...newUrls]
            })
          }

          // Show results to user
          if (failedCount > 0) {
            toast.error(`${failedCount} de ${newScreenshots.length} imágenes no se pudieron subir`)
          }

          if (successCount > 0) {
            toast.success(`${successCount} de ${newScreenshots.length} imágenes subidas correctamente`)
          }
        }
      }
    } catch (error) {
      console.error('Error al subir imágenes:', error)
      toast.error('Error al subir las imágenes: ' + (error instanceof Error ? error.message : 'Desconocido'))
    } finally {
      setIsUploading(false)
    }
  }

  // Combine new files with restored files
  const combinedScreenshotFiles = [...restoredScreenshots, ...screenshotFiles]
  const combinedIconFiles = restoredIcon ? [restoredIcon, ...iconFiles] : iconFiles

  // Check if current step is valid
  const isStepValid = (): boolean => {
    const currentStepData = steps[currentStep]
    const currentValue = formData[currentStepData.id as keyof FormData] as string || ''

    switch (currentStepData.id) {
      case 'information':
        return Boolean(
          formData.name.trim() !== '' &&
          formData.tagline.trim() !== '' &&
          formData.description.trim() !== '' &&
          formData.link.trim() !== '' &&
          (combinedIconFiles.length > 0 || formData.iconUrl)
        )
      case 'screenshots':
        return Boolean(combinedScreenshotFiles.length > 0 || (formData.screenshotUrls && formData.screenshotUrls.length > 0))
      default:
        return Boolean(currentValue.length > 0 && getCharsRemaining(currentValue) >= 0)
    }
  }

  // Character count utilities
  const getCharsRemaining = (value: string) => {
    return MAX_CHARS - value.length
  }

  const isOverLimit = (value: string) => {
    return getCharsRemaining(value) < 0
  }

  // Custom remove function that handles both new and restored files
  const removeScreenshotFile = (id: string) => {
    // Check if it's a restored file
    const isRestored = restoredScreenshots.some(file => file.id === id)

    if (isRestored) {
      // Remove from restored screenshots and update formData
      const updatedRestored = restoredScreenshots.filter(file => file.id !== id)
      setRestoredScreenshots(updatedRestored)

      // Update formData.screenshotUrls
      const updatedUrls = formData.screenshotUrls?.filter((_, index) => {
        const restoredFile = restoredScreenshots[index]
        return restoredFile?.id !== id
      }) || []

      setFormData({
        ...formData,
        screenshotUrls: updatedUrls
      })
    } else {
      // Remove from new files using the original function
      removeFile(id)
    }
  }

  const removeIconFileCustom = (id: string) => {
    // Check if it's the restored icon
    if (restoredIcon && restoredIcon.id === id) {
      // Remove restored icon and update formData
      setRestoredIcon(null)
      setFormData({
        ...formData,
        iconUrl: ''
      })
    } else {
      // Remove from new files using the original function
      removeIconFile(id)
    }
  }

  // Create context value
  const value: ProductFormContextType = {
    currentStep,
    setCurrentStep,
    clearCurrentStep,
    formData,
    setFormData,
    clearFormData,
    clearAllData,
    steps,
    handleChange,
    handleInputChange,
    handleUploadImages,
    isUploading,
    isStepValid,
    // Icon upload - use combined files
    iconFiles: combinedIconFiles as unknown as FileWithPreview[],
    removeIconFile: removeIconFileCustom,
    openIconDialog,
    getIconInputProps,
    // Screenshot upload - use combined files
    screenshotFiles: combinedScreenshotFiles as unknown as FileWithPreview[],
    isDragging,
    screenshotErrors,
    handleDragEnter: handleDragEnter as unknown as (e: DragEvent<Element>) => void,
    handleDragLeave: handleDragLeave as unknown as (e: DragEvent<Element>) => void,
    handleDragOver: handleDragOver as unknown as (e: DragEvent<Element>) => void,
    handleDrop: handleDrop as unknown as (e: DragEvent<Element>) => void,
    openFileDialog,
    removeFile: removeScreenshotFile,
    clearFiles,
    getInputProps,
    screenshots,
    maxChars: MAX_CHARS,
    getCharsRemaining,
    isOverLimit
  }

  return (
    <ProductFormContext.Provider value={value}>
      {children}
    </ProductFormContext.Provider>
  )
}

// Hook for using the context
export function useProductFormProvider() {
  const context = useContext(ProductFormContext)
  if (context === undefined) {
    throw new Error('useProductFormProvider must be used within a ProductFormProvider')
  }
  return context
} 