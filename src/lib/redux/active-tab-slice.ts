import { loginSlice } from "@/lib/redux/login-slice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface activeTabState {
  active: number;
}

const initialState: activeTabState = {
  active: 0,
};

export const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    changeActive: (state, action: PayloadAction<number>) => {
      state.active = action.payload;
    },
  },
});

export const { changeActive } = activeTabSlice.actions;

export const { reducer } = activeTabSlice;
