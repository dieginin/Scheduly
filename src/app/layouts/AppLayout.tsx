import { Outlet } from "react-router"

const AppLayout = () => {
  return (
    <div className='min-h-svh'>
      <Outlet />
    </div>
  )
}

export default AppLayout
