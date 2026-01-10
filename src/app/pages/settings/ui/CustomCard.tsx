import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ForwardRefExoticComponent, PropsWithChildren } from "react"

import { Button } from "@/components/ui/button"
import type { LucideProps } from "lucide-react"

interface Props extends PropsWithChildren {
  buttonLabel?: string
  description?: string
  icon: ForwardRefExoticComponent<LucideProps>
  title: string

  onBtnClick?: () => Promise<void>
}

export const CustomCard = ({ buttonLabel, children, description, icon: Icon, title, onBtnClick }: Props) => {
  return (
    <Card className='rounded-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Icon className='w-5 h-5' />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className='grid'>{children}</CardContent>

      {buttonLabel && (
        <CardFooter>
          <Button className='w-full' onClick={onBtnClick}>
            {buttonLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
