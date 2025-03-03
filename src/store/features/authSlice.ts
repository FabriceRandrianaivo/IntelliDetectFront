import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
// import { user_signUp } from "../../components/myAux/backoffice/helpers/interfaces";
import authService from "../../services/authentication/authenticationService";
// import { showToast } from "../../services/helpers/utils";

const API_BASE_URL = import.meta.env.VITE_API_SERVER_URL;

interface Credential {
  email: string | undefined;
  password: string | undefined;
}
interface AuthState {
  isAuthenticated: boolean;
  user: Record<string, unknown>;
  userDetail: Record<string, unknown>;
  organization?: {
    id: string;
    name: string;
  };
  isUserInvited?: {
    status: boolean;
    payload: any;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
  userDetail: {},
  isUserInvited: {
    status: false,
    payload: {},
  },
};

export const fetchUserInfo = createAsyncThunk(
  "auth/user",
  async (_, ThunkApi) => {
    try {
      const response = await authService.get("/user");
      return ThunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: Credential, ThunkApi) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      return ThunkApi.fulfillWithValue(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        throw ThunkApi.rejectWithValue(JSON.stringify([error.response!.data]));
      } else {
        throw ThunkApi.rejectWithValue((error as Error).message);
      }
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, ThunkApi) => {
  try {
    const response = await authService.delete("/auth/logout");
    return ThunkApi.fulfillWithValue(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ThunkApi.rejectWithValue(JSON.stringify([error.response!.data]));
    } else {
      throw ThunkApi.rejectWithValue((error as Error).message);
    }
  }
});
// export const signup = createAsyncThunk(
//   "auth/sign-up",
//   async (user: user_signUp, ThunkApi) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/auth/sign-up`, user);
//       return ThunkApi.fulfillWithValue(response.data);
//     } catch (error) {
//       if (isAxiosError(error)) {
//         throw ThunkApi.rejectWithValue(error.response!.data);
//       } else {
//         throw ThunkApi.rejectWithValue((error as Error).message);
//       }
//     }
//   }
// );
// export const forgotPassword = createAsyncThunk(
//   "auth/forgot-password",
//   async (email: string, ThunkApi) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/user/forgot-password`,
//         { email: email }
//       );
//       return ThunkApi.fulfillWithValue(response.data);
//     } catch (error) {
//       showToast(error?.response?.data?.detail, "error", {
//         position: "top-center",
//         autoClose: 1000,
//       });
//       return ThunkApi.rejectWithValue(error?.response?.data?.detail);
//     }
//   }
// );
// export const updateUserProfile = createAsyncThunk(
//   "auth/update-profile",
//   async ({ link, body }: { link: string; body: any }, ThunkApi) => {
//     const token = Cookies.get("user");
//     try {
//       const response = await axios.put(`${API_BASE_URL}/${link}`, body, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Si besoin d'une authentification
//           "Content-Type": "application/json",
//         },
//       });

//       return ThunkApi.fulfillWithValue(response.data);
//     } catch (error) {
//       if (isAxiosError(error)) {
//         throw ThunkApi.rejectWithValue(JSON.stringify([error.response!.data]));
//       } else {
//         throw ThunkApi.rejectWithValue((error as Error).message);
//       }
//     }
//   }
// );

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    followInvitationStep: (state, action) => {
      state.isUserInvited = {
        status: true,
        payload: action.payload,
      };
    },
    removeTraceUserInvited: (state) => {
      state.isUserInvited = {
        status: false,
        payload: {},
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      Cookies.remove("user");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = {};
    });
    // builder.addCase(signup.fulfilled, (state) => {
    //   state.isAuthenticated = false;
    //   state.user = {};
    // });
    // builder.addCase(updateUserProfile.fulfilled, (state, action) => {
    //   const { email, first_name, last_name } = action.payload.user;
    //   state.user.email = email;
    //   state.user.first_name = first_name;
    //   state.user.last_name = last_name;
    //   state.user.token = Cookies.get("user");
    // });
    // builder.addCase(forgotPassword.fulfilled, (state, action) => {
    //   return action.payload;
    // });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export default AuthSlice.reducer;
export const {
  setIsAuthenticated,
  followInvitationStep,
  removeTraceUserInvited,
} = AuthSlice.actions;
