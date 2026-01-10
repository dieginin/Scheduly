import { Controller, useForm } from "react-hook-form"
import { type RegisterFormData, registerFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import type { Field } from "@/auth/interfaces"
import { FormField } from "@/components/shared"
import { Link } from "react-router"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

const fields: Field<RegisterFormData>[] = [
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

export const RegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    const { name, email, username, password } = data
    const isRegisterSuccessful = await register(email, name, password, username)

    setIsLoading(false)
    if (isRegisterSuccessful) toast.success("Welcome")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
      <div className='grid gap-4 px-3'>
        {fields.map(f => (
          <Controller
            key={f.name}
            name={f.name}
            control={form.control}
            disabled={isLoading}
            render={({ field, fieldState }) => (
              <FormField field={field} fieldState={fieldState} label={f.label} name={f.name} placeholder={f.placeholder} type={f.type} />
            )}
          />
        ))}
      </div>

      <div className='grid gap-2'>
        <Button disabled={isLoading}>Register</Button>
        <Link to={"/auth/login"}>
          <Button type='button' variant='outline' disabled={isLoading} className='w-full'>
            Go back
          </Button>
        </Link>
      </div>
    </form>
  )
}
