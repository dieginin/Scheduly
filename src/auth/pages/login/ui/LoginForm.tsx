import { Controller, useForm } from "react-hook-form"
import { type LoginFormData, loginFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import type { Field } from "@/interfaces"
import { FormField } from "@/components/shared"
import { Link } from "react-router"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks"
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

  const { login } = useAuth()

  const onSubmit = async (data: LoginFormData) => {
    const { password, username } = data
    const isLoginSuccessful = await login(password, username)

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
            disabled={form.formState.isLoading}
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
        <Button disabled={form.formState.isLoading}>Login</Button>
        <Link to={"/auth/register"}>
          <Button type='button' variant='outline' disabled={form.formState.isLoading} className='w-full'>
            Register
          </Button>
        </Link>
      </div>
    </form>
  )
}
