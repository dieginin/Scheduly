import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { LoginForm } from "./ui"
import { Title } from "@/auth/components"

export const LoginPage = () => {
  return (
    <Card className='w-sm py-10'>
      <CardHeader>
        <Title title='Scheduly' subtitle='Welcome please login' />
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
