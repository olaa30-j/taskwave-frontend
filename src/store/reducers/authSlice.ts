import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; 
import { jwtDecode } from "jwt-decode"; 
import { getTokenFromCookies, isAuthenticated } from "@/utils/authUtils";
import { getUserDataService, loginUserService } from "@/app/_lib/user";
import Cookies from "js-cookie"

export interface UserData {
  userImage: string | null; 
  username: string | null;
  email: string | null;
}

export interface UserState {
  isAuthenticated: boolean;
  userData: UserData;
  token: string | null;
}

const tokenFromCookies = getTokenFromCookies();

export const initialUserData: UserData = {
  userImage: null,
  username: null,
  email: null,
};

export const initialState: UserState = {
  isAuthenticated: isAuthenticated(),
  userData: tokenFromCookies ? jwtDecode(tokenFromCookies) : initialUserData,
  token: tokenFromCookies || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = initialUserData;
      Cookies.remove('authToken');
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
  },
});

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = await loginUserService(credentials);
      
      if (token) {
        dispatch(login(token));
        
        const userData: UserData = await getUserDataService(token); 
        dispatch(setUserData(userData));
      } else {
        console.error("No token received.");
      }
    
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
};

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;

