'use client'

import { ProductFormProvider } from '@/contexts/ProductFormContext'

export default function NewProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProductFormProvider mode="create">
      {children}
    </ProductFormProvider>
  )
} 