import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo.roles === "admin") {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized!</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default AdminRoute