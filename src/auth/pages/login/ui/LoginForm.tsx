import { Controller, useForm } from "react-hook-form"
import { type LoginFormData, loginFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import { FormField } from "@/auth/components"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/auth/stores"
import { useState } from "react"
import { toast } from "sonner"

export const LoginForm = () => {
  const navigate = useNavigate()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    const { password, username } = data
    const isLoginSuccessful = await login(password, username)

    setIsLoading(false)
    return isLoginSuccessful ? toast.success("Welcome back") : toast.error("Verify credentials")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid'>
      <div className='grid gap-5 px-3'>
        <Controller
          name='username'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Username' name='username' placeholder='Enter your username' />
          )}
        />

        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Password' name='password' placeholder='Enter your password' type='password' />
          )}
        />
      </div>

      <Button type='button' variant='link' size='sm' className='mt-2' disabled>
        Forgot password? {/* TODO */}
      </Button>
      <div className='grid gap-2'>
        <Button disabled={isLoading}>Login</Button>
        <Button type='button' variant='outline' onClick={() => navigate("/auth/register")}>
          Register
        </Button>
      </div>
    </form>
  )
}
