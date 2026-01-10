import { Controller, useForm } from "react-hook-form"
import { type RegisterFormData, registerFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import { FormField } from "@/auth/components"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks"
import { useNavigate } from "react-router"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

export const RegisterForm = () => {
  const navigate = useNavigate()
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
      <div className='px-3 grid gap-4'>
        <Controller
          name='name'
          control={form.control}
          disabled={isLoading}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label={"Name"} name={"name"} placeholder={"Enter your name"} />
          )}
        />

        <Controller
          name='email'
          control={form.control}
          disabled={isLoading}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Email' name='email' placeholder='Enter a email' />
          )}
        />

        <Controller
          name='username'
          control={form.control}
          disabled={isLoading}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Username' name='username' placeholder='Enter a username' />
          )}
        />

        <Controller
          name='password'
          control={form.control}
          disabled={isLoading}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Password' name='password' placeholder='Enter a password' type='password' />
          )}
        />

        <Controller
          name='confirmPassword'
          control={form.control}
          disabled={isLoading}
          render={({ field, fieldState }) => (
            <FormField
              field={field}
              fieldState={fieldState}
              label='Confirm Password'
              name='confirmPassword'
              placeholder='Confirm your password'
              type='password'
            />
          )}
        />
      </div>

      <div className='grid gap-2'>
        <Button disabled={isLoading}>Register</Button>
        <Button type='button' variant='outline' onClick={() => navigate("/auth/login")} disabled={isLoading}>
          Go Back
        </Button>
      </div>
    </form>
  )
}
