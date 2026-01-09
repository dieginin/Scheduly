import type { ControllerFieldState, ControllerRenderProps } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

import type { HTMLInputTypeAttribute } from "react"
import { Input } from "@/components/ui/input"
import type { LoginFormData } from "@/auth/validations"

interface Props {
  field: ControllerRenderProps<LoginFormData>
  fieldState: ControllerFieldState
  label: string
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
}

export const FormField = ({ field, fieldState, label, name, placeholder, type }: Props) => {
  return (
    <Field data-invalid={fieldState.invalid} className='grid gap-1'>
      <FieldLabel htmlFor={name} children={label} />
      <Input {...field} id={name} aria-invalid={fieldState.invalid} placeholder={placeholder} autoComplete='off' type={type} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
