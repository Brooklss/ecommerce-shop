'use client'

import { useParams } from 'next/navigation'
import ProductForm from '@/components/ProductForm'

export default function EditProductPage() {
  const params = useParams()
  const id = parseInt(params.id as string)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm productId={id} />
    </div>
  )
}

