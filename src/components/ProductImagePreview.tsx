import Image from 'next/image'
import { useState } from 'react'

interface ProductImagePreviewProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackText?: string
}

export function ProductImagePreview({
  src,
  alt,
  width = 200,
  height = 200,
  className = '',
  fallbackText = 'Imagen no disponible'
}: ProductImagePreviewProps) {
  const [error, setError] = useState(false)

  // Si la URL no es válida o está vacía, mostramos el fallback
  if (!src || error) {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <p className="text-muted-foreground text-sm text-center p-2">{fallbackText}</p>
      </div>
    )
  }

  // Para URLs de Vercel Blob, usamos un enfoque diferente para evitar problemas con next/image
  if (src.includes('vercel-storage.com')) {
    return (
      // Usamos img estándar para URLs de Vercel Blob para evitar restricciones de next/image
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setError(true)}
      />
    )
  }

  // Verificar si la URL ya incluye el prefijo productmakers
  const imageSrc = src.includes('productmakers/')
    ? src
    : src.startsWith('http')
      ? src // Si ya es una URL completa, la dejamos intacta
      : `productmakers/${src}` // En caso contrario, añadimos el prefijo

  // Para otras imágenes, usamos next/image 
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  )
} 