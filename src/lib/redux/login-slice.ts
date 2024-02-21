import { miaoLogin } from "@/lib/miao-api/login";
import { AppRuntime } from "@/lib/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface loginState {
  data: AppRuntime | null;
  isLogin: boolean;
  isLoading: boolean;
}

const initialState: loginState = {
  data: null,
  isLogin: false,
  isLoading: false,
};

export const actionFetchLoginData = createAsyncThunk("login", async () => {
  return await miaoLogin();
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(actionFetchLoginData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        actionFetchLoginData.fulfilled,
        (state, action: PayloadAction<AppRuntime>) => {
          state.isLoading = false;
          state.isLogin = true;
          state.data = action.payload;
        }
      );
  },
});

export const { reducer } = loginSlice;
