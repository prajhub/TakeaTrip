import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import UnauthorizedError from '../Components/AdminComponents/UnauthorizedError'

const UserRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo || !userInfo.role || (!userInfo.role.includes('User') && !userInfo.role.includes('Service Provider')) ) {
    return (
      <UnauthorizedError/>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default UserRoute