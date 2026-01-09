import { Loading } from "@/components/shared"
import { Navigate } from "react-router"
import type { PropsWithChildren } from "react"
import { useAuthStore } from "@/auth/stores"

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { status } = useAuthStore()
  if (status === "checking") return <Loading />
  if (status === "unauthenticated") return <Navigate to='/auth/login' />
  return children
}
