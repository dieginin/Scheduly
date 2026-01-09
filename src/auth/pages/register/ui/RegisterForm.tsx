import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { registerFormSchema, type RegisterFormData } from "@/auth/validations"

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

  const onSubmit = (data: RegisterFormData) => console.log(data) // TODO

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5'>
      <div className='px-3 grid gap-4'>
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label={"Name"} name={"name"} placeholder={"Enter your name"} />
          )}
        />

        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Email' name='email' placeholder='Enter a email' />
          )}
        />

        <Controller
          name='username'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Username' name='username' placeholder='Enter a username' />
          )}
        />

        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormField field={field} fieldState={fieldState} label='Password' name='password' placeholder='Enter a password' type='password' />
          )}
        />

        <Controller
          name='password'
          control={form.control}
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
        <Button>Register</Button>
        <Button type='button' variant='outline' onClick={() => navigate("/auth/login")}>
          Go Back
        </Button>
      </div>
    </form>
  )
}
