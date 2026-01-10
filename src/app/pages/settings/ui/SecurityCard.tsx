import { type SecurityFormData, securityFormSchema } from "../validations"

import { CustomCard } from "./CustomCard"
import type { Field } from "@/interfaces"
import { Lock } from "lucide-react"
import { MapFields } from "@/components/shared"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const fields: Field<SecurityFormData>[] = [
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Confirm your password",
    type: "password",
  },
]

export const SecurityCard = () => {
  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SecurityFormData) => console.log(data) // TODO

  return (
    <CustomCard
      icon={Lock}
      title='Security'
      description='Handle your password'
      buttonLabel='Update password'
      onBtnClick={form.handleSubmit(onSubmit)}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
        <MapFields fields={fields} form={form} />
      </form>
    </CustomCard>
  )
}
