import { type LoginFormData, loginFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import type { Field } from "@/interfaces"
import { Link } from "react-router"
import { MapFields } from "@/components/shared"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks"
import { useForm } from "react-hook-form"
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
  const { login } = useAuth()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    const { password, username } = data
    const isLoginSuccessful = await login(username, password)

    if (isLoginSuccessful) toast.success("Welcome back")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid'>
      <div className='grid gap-5 px-3'>
        <MapFields fields={fields} form={form} />
      </div>

      <Button type='button' variant='link' size='sm' className='mt-2' disabled>
        Forgot password? {/* TODO */}
      </Button>
      <div className='grid gap-2'>
        <Button disabled={form.formState.isSubmitting}>Login</Button>
        <Link to={"/auth/register"}>
          <Button type='button' variant='outline' disabled={form.formState.isSubmitting} className='w-full'>
            Register
          </Button>
        </Link>
      </div>
    </form>
  )
}
