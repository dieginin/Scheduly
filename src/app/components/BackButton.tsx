import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router"

export const BackButton = () => {
  return (
    <Link to='/' className='border-background fixed top-4 left-4 overflow-hidden rounded-sm border p-0.5 backdrop-blur-sm'>
      <Button variant='link'>
        <ChevronLeft className='-mr-1' />
        Go back
      </Button>
    </Link>
  )
}
