import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { History, LogOut, Settings } from "lucide-react"

import { Link } from "react-router"
import { useAuth } from "@/auth/hooks"

const routes = [
  {
    icon: History,
    label: "Reports",
    path: "/reports",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
]

export const MenuButton = () => {
  const { user, logout, getUserInitials, getUserShortName } = useAuth()

  return (
    <div className='border-background fixed top-4 right-4 overflow-hidden rounded-sm border p-0.5 backdrop-blur-sm'>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center cursor-pointer'>
          <Avatar>
            <AvatarFallback className='text-xs'>{getUserInitials()}</AvatarFallback>
          </Avatar>
          <p className='m-2 text-sm'>{getUserShortName()}</p>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuLabel className='flex items-center gap-2'>
            <div className='grid'>
              <h1 className='text-xs'>{user?.name}</h1>
              <small className='font-light capitalize'>{user?.roles.join("")}</small>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {routes.map(route => (
            <Link key={route.label} to={route.path}>
              <DropdownMenuItem>
                <route.icon />
                {route.label}
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuSeparator />

          <DropdownMenuItem variant='destructive' onClick={logout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
