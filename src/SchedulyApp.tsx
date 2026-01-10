import { Loading, ThemeListener } from "./components/shared"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

import type { PropsWithChildren } from "react"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"
import { appRouter } from "./router/app.router"
import { useAuth } from "./auth/hooks"
import { useThemeStore } from "./stores"

const queryClient = new QueryClient()
const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkStatus } = useAuth()

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
  const theme = useThemeStore(s => s.theme)

  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
        <Toaster position='top-right' theme={theme} closeButton />
      </CheckAuthProvider>
      <ThemeListener />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
