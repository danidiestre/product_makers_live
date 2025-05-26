'use client'

import { useParams } from 'next/navigation'
import { ProductFormProvider } from '@/contexts/ProductFormContext'

export default function EditProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const productId = params?.id as string

  if (!params || !productId) {
    return <div>Loading...</div>
  }

  return (
    <ProductFormProvider mode="edit" productId={productId}>
      {children}
    </ProductFormProvider>
  )
} 