import { Controller, useForm } from "react-hook-form"
import { type LoginFormData, loginFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import type { Field } from "@/interfaces"
import { FormField } from "@/components/shared"
import { Link } from "react-router"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

const fields: Field<LoginFormData>[] = [
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
]

export const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    const { password, username } = data
    const isLoginSuccessful = await login(password, username)

    setIsLoading(false)
    if (isLoginSuccessful) toast.success("Welcome back")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid'>
      <div className='grid gap-5 px-3'>
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

      <Button type='button' variant='link' size='sm' className='mt-2' disabled>
        Forgot password? {/* TODO */}
      </Button>
      <div className='grid gap-2'>
        <Button disabled={isLoading}>Login</Button>
        <Link to={"/auth/register"}>
          <Button type='button' variant='outline' disabled={isLoading} className='w-full'>
            Register
          </Button>
        </Link>
      </div>
    </form>
  )
}
