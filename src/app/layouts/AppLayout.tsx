import { Outlet } from "react-router"

const AppLayout = () => {
  console.log("AppLayout loaded")
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AppLayout
