import { Loading } from "@/components/shared"
import { Navigate } from "react-router"
import type { PropsWithChildren } from "react"
import { useAuth } from "@/auth/hooks"

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { status } = useAuth()
  if (status === "checking") return <Loading />
  if (status === "authenticated") return <Navigate to='/' />
  return children
}
