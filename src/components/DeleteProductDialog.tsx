'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteProduct } from '@/app/products/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface DeleteProductDialogProps {
  productId: string
  productName: string
}

export function DeleteProductDialog({ productId, productName }: DeleteProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteProduct(productId)

      if (!result.success) {
        throw new Error(result.error || 'Error al borrar el producto')
      }

      toast.success('Producto borrado correctamente')
      setIsOpen(false)
      router.refresh() // Refresh the page to update the products list
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error(error instanceof Error ? error.message : 'Error al borrar el producto')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash2 className="size-4" />
          Borrar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto borrará permanentemente el producto{' '}
            <strong>"{productName}"</strong> y todos sus datos asociados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Borrando...' : 'Sí, borrar producto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 