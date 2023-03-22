import jwtDecode from "jwt-decode";
import { setLogOut } from "./authSlice";

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
    const { token } = store.getState().auth;
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      if (action.type !== setLogOut.type) {
        store.dispatch(setLogOut());
        localStorage.removeItem("access-token");
      }
    }
  }

  return next(action);
};
  
  export default checkTokenExpirationMiddleware;