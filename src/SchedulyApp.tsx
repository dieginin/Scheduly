import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

import { Loading } from "./components/shared"
import type { PropsWithChildren } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import { appRouter } from "./router/app.router"
import { useAuthStore } from "./auth/stores"

const queryClient = new QueryClient()
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkStatus } = useAuthStore()

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  })

  if (isLoading) return <Loading />
  return children
}

export const SchedulyApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
        <Toaster />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
