import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { userRegister } from "./registerAction";
import { updateUser } from "./updateAction";

const token = localStorage.getItem("access-token")
  ? localStorage.getItem("access-token")
  : null;

const initialState = {
  loading: false,
  token,
  userInfo: {},
  roleInfo: {},

  error: null,
  success: false,
  registerMsg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },

    setLogOut: (state, action) => {
      localStorage.removeItem("access-token");
      state.loading = false;
      state.userInfo = null;
      state.error = null;
      state.token = null;
      state.roleInfo = null;
    },
    setCredentials: (state, { payload }) => {
      state.roleInfo = payload;
    },
    setNewInfo: (state, { payload }) => {
      state.roleInfo = payload;
    },
    setClearSuccess: (state, action) => {
      state.success = false;
    },
    setClearMessage: (state, action) => {
      state.registerMsg = "";
    },
  },
  extraReducers: (builder) => {
    //login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;
      state.userInfo = payload;
    });

    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.registerMsg = payload.message;
    });

    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {
  setLogin,
  setLogOut,
  setCredentials,
  setClearSuccess,
  setClearMessage,
  setNewInfo,
} = authSlice.actions;

export default authSlice.reducer;
