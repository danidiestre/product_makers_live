'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface ProductDetailAnalyticsProps {
  productId: string
  productCategory?: string
}

export function ProductDetailAnalytics({
  productId,
  productCategory
}: ProductDetailAnalyticsProps) {
  const { trackProductDetailView } = useAnalytics()

  useEffect(() => {
    // Track product detail view when component mounts
    trackProductDetailView({
      product_id: productId,
      product_category: productCategory,
      view_source: "product_click", // Could be dynamic based on referrer
      referrer: typeof window !== 'undefined' ? document.referrer : undefined
    })
  }, [productId, productCategory, trackProductDetailView])

  // This component doesn't render anything
  return null
} 