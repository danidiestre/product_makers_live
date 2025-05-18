'use client'

import { Textarea } from '@/components/ui/textarea'
import { useProductFormProvider } from '@/contexts/ProductFormContext'

interface TextStepProps {
  stepId: string;
}

export function TextStep({ stepId }: TextStepProps) {
  const {
    formData,
    handleChange,
    maxChars,
    getCharsRemaining,
    isOverLimit
  } = useProductFormProvider()

  const currentValue = formData[stepId as keyof typeof formData] as string || ''
  const charsRemaining = getCharsRemaining(currentValue)

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        rows={6}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value, stepId)}
        placeholder=""
        maxLength={maxChars}
      />
      <div className="flex justify-end">
        <span className={`text-sm ${isOverLimit(currentValue) ? 'text-destructive' : 'text-muted-foreground'}`}>
          {charsRemaining} caracteres restantes
        </span>
      </div>
    </div>
  )
} 