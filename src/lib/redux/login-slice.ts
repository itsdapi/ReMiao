import { miaoLogin } from "@/lib/miao-api/login";
import { AppRuntime } from "@/lib/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocalRuntime } from "@/lib/util";

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

export const actionFetchLoginData = createAsyncThunk(
  "login/fetch",
  async () => {
    return await miaoLogin();
  }
);

export const actionLoadLoginData = createAsyncThunk("login/load", async () => {
  return await getLocalRuntime();
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
      .addCase(actionFetchLoginData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(actionLoadLoginData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actionLoadLoginData.fulfilled, (state, action) => {
        if (!action.payload) {
          console.error("Fail to load login data");
          return;
        }
        state.isLoading = false;
        state.isLogin = true;
        state.data = action.payload;
        console.log("Redux loaded local runtime data");
      });
  },
});

export const { reducer } = loginSlice;
