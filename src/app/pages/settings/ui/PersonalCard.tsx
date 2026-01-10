import { type PersonalFormData, personalFormSchema } from "../validations"

import { CustomCard } from "./CustomCard"
import type { Field } from "@/interfaces"
import { MapFields } from "@/components/shared"
import { User } from "lucide-react"
import { useAuth } from "@/auth/hooks"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const fields: Field<PersonalFormData>[] = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    label: "Username",
    name: "username",
    placeholder: "Enter your username",
  },
]

export const PersonalCard = () => {
  const { user } = useAuth()
  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      username: user?.username,
    },
  })

  const onSubmit = async (data: PersonalFormData) => console.log(data) // TODO

  return (
    <CustomCard
      icon={User}
      title='Personal Information'
      description="Update your profile's information"
      buttonLabel='Save'
      onBtnClick={form.handleSubmit(onSubmit)}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
        <MapFields fields={fields} form={form} />
      </form>
    </CustomCard>
  )
}
