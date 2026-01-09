import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { RegisterForm } from "./ui/RegisterForm"
import { Title } from "@/auth/components"

export const RegisterPage = () => {
  return (
    <Card className='w-sm py-10'>
      <CardHeader>
        <Title title='Register' subtitle='Please enter your information' withoutLogo />
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}
