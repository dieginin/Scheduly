import { Outlet } from "react-router"

const AppLayout = () => {
  return (
    <div className='grid items-center justify-center h-svh'>
      <Outlet />
    </div>
  )
}

export default AppLayout
