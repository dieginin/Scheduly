import { type RegisterFormData, registerFormSchema } from "@/auth/validations"

import { Button } from "@/components/ui/button"
import type { Field } from "@/interfaces"
import { Link } from "react-router"
import { MapFields } from "@/components/shared"
import { toast } from "sonner"
import { useAuth } from "@/auth/hooks"
import { useForm } from "react-hook-form"
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
  const { register } = useAuth()
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

  const onSubmit = async (data: RegisterFormData) => {
    const { name, email, username, password } = data
    const isRegisterSuccessful = await register(email, name, password, username)

    if (isRegisterSuccessful) toast.success("Welcome")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
      <div className='grid gap-4 px-3'>
        <MapFields fields={fields} form={form} />
      </div>

      <div className='grid gap-2'>
        <Button disabled={form.formState.isSubmitting}>Register</Button>
        <Link to={"/auth/login"}>
          <Button type='button' variant='outline' disabled={form.formState.isSubmitting} className='w-full'>
            Go back
          </Button>
        </Link>
      </div>
    </form>
  )
}
