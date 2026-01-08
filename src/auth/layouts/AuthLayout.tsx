import { Outlet } from "react-router"

const AuthLayout = () => {
  console.log("AuthLayout loaded")
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
