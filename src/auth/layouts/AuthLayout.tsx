import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <div className='grid items-center justify-center min-h-svh'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
