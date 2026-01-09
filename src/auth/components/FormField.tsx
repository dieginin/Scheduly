import type { ControllerFieldState, ControllerRenderProps, FieldValues, Path } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

import type { HTMLInputTypeAttribute } from "react"
import { Input } from "@/components/ui/input"

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>
  fieldState: ControllerFieldState
  label: string
  name: Path<T>
  placeholder: string
  type?: HTMLInputTypeAttribute
}

export const FormField = <T extends FieldValues>({ field, fieldState, label, name, placeholder, type }: Props<T>) => {
  return (
    <Field data-invalid={fieldState.invalid} className='grid gap-1'>
      <FieldLabel htmlFor={name} children={label} />
      <Input {...field} id={name} aria-invalid={fieldState.invalid} placeholder={placeholder} type={type} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
