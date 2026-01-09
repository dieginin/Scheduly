import { Loading } from "@/components/shared"
import { Navigate } from "react-router"
import type { PropsWithChildren } from "react"
import { useAuthStore } from "@/auth/stores"

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { status } = useAuthStore()
  if (status === "checking") return <Loading />
  if (status === "authenticated") return <Navigate to='/' />
  return children
}
