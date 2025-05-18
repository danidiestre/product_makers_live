'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleUserRound, X } from 'lucide-react'
import { ProductImagePreview } from '@/components/ProductImagePreview'
import { useProductFormProvider } from '@/contexts/ProductFormContext'
import { useState } from 'react'

export function InformationStep() {
  const {
    formData,
    setFormData,
    handleInputChange,
    iconFiles,
    removeIconFile,
    openIconDialog,
    getIconInputProps
  } = useProductFormProvider()

  const [urlError, setUrlError] = useState("")

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
                aria-label={iconFiles[0]?.preview || formData.iconUrl ? "Cambiar imagen" : "Subir imagen"}
              >
                {/* Mostrar la previsualización del icono */}
                {iconFiles[0]?.preview ? (
                  // Si hay un archivo subido recientemente, mostrar su previsualización
                  <img
                    className="size-full object-cover rounded-lg"
                    src={iconFiles[0].preview}
                    alt="Vista previa del icono"
                    width={128}
                    height={128}
                  />
                ) : formData.iconUrl ? (
                  // Si hay una URL guardada en localStorage, usar ProductImagePreview
                  <ProductImagePreview
                    src={formData.iconUrl}
                    alt="Vista previa del icono guardado"
                    width={128}
                    height={128}
                    className="size-full object-cover rounded-lg"
                  />
                ) : (
                  // Si no hay icono, mostrar el placeholder
                  <div aria-hidden="true">
                    <CircleUserRound className="size-8 opacity-60" />
                  </div>
                )}
              </Button>
              {(iconFiles[0]?.preview || formData.iconUrl) && (
                <Button
                  onClick={() => {
                    if (iconFiles[0]?.id) {
                      removeIconFile(iconFiles[0].id)
                    }
                    if (formData.iconUrl) {
                      setFormData({
                        ...formData,
                        iconUrl: ''
                      })
                    }
                  }}
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
              onChange={handleInputChange}
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
              onChange={(e) => {
                const url = e.target.value;
                try {
                  // Check if URL is valid by attempting to construct URL object
                  if (url && !url.startsWith('http')) {
                    // Add https:// prefix if missing
                    setFormData({
                      ...formData,
                      link: `https://${url}`
                    });
                    setUrlError(""); // Clear error if prefix fixed the URL
                  } else if (url) {
                    new URL(url); // Will throw if invalid
                    handleInputChange(e);
                    setUrlError(""); // Clear error on valid URL
                  } else {
                    // Empty input is valid (no URL)
                    handleInputChange(e);
                    setUrlError("");
                  }
                } catch (err) {
                  // Invalid URL - still update but show validation error
                  handleInputChange(e);
                  setUrlError("La URL ingresada no es válida");
                }
              }}
              placeholder="https://tuaplicacion.com"
              pattern="https?://.*"
              title="Debe ser una URL válida comenzando con http:// o https://"
              className={urlError ? "border-red-500" : ""}
            />
            {urlError && <p className="text-red-500 text-xs mt-1">{urlError}</p>}
          </div>
        </div>
      </div>
    </div>
  )
} 