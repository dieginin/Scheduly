import { Controller, type FieldValues, type UseFormReturn } from "react-hook-form"

import type { Field } from "@/interfaces"
import { FormField } from "@/components/shared"

export const MapFields = <T extends FieldValues, J extends UseFormReturn<T>>({ fields, form }: { fields: Field<T>[]; form: J }) => {
  return fields.map(f => (
    <Controller
      key={f.name}
      name={f.name}
      control={form.control}
      disabled={form.formState.isLoading}
      render={({ field, fieldState }) => (
        <FormField field={field} fieldState={fieldState} label={f.label} name={f.name} placeholder={f.placeholder} type={f.type} />
      )}
    />
  ))
}
