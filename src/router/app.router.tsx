import { AuthenticatedRoute, NotAuthenticatedRoute } from "./routes"
import { HomePage, ReportsPage, SettingsPage } from "@/app/pages"
import { LoginPage, RegisterPage } from "@/auth/pages"
import { Navigate, createBrowserRouter } from "react-router"

import type { RouteObject } from "react-router"
import { lazy } from "react"

const AppLayout = lazy(() => import("@/app/layouts/AppLayout"))
const AuthLayout = lazy(() => import("@/auth/layouts/AuthLayout"))

const mainRoutes: RouteObject = {
  path: "/",
  element: <AuthenticatedRoute children={<AppLayout />} />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "reports",
      element: <ReportsPage />,
    },
    {
      path: "settings",
      element: <SettingsPage />,
    },
  ],
}

const authRoutes: RouteObject = {
  path: "/auth",
  element: <NotAuthenticatedRoute children={<AuthLayout />} />,
  children: [
    {
      index: true,
      element: <Navigate to='/auth/login' />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
}

const notFoundRoute: RouteObject = {
  path: "*",
  element: <Navigate to='/' />,
}

export const appRouter = createBrowserRouter([mainRoutes, authRoutes, notFoundRoute])
