import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import UnauthorizedError from "../Components/AdminComponents/UnauthorizedError";

const BookedRoomRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { roleInfo } = useSelector((state) => state.auth);

  // show unauthorized screen if no user is found in redux store or user has not booked a room
  if (
    !userInfo ||
    !userInfo.role ||
    (!userInfo.role.includes("User") &&
      !userInfo.role.includes("Service Provider")) ||
    !roleInfo.hasBookedRoom
  ) {
    return <UnauthorizedError />;
  }

  // returns child route elements
  return <Outlet />;
};

export default BookedRoomRoute;
