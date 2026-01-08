import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"

export const SchedulyApp = () => {
  return <RouterProvider router={appRouter} />
}
