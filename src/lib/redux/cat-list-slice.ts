import { getCatList } from "@/lib/miao-api/cat";
import { CatList } from "@/lib/miao-api/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface catListState {
  data: CatList[] | null;
  isLoading: boolean;
}

const initialState: catListState = {
  data: null,
  isLoading: false,
};
export const actionFetchCatList = createAsyncThunk("catList", async () => {
  return await getCatList();
});

export const catListSlice = createSlice({
  name: "catList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(actionFetchCatList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        actionFetchCatList.fulfilled,
        (state, action: PayloadAction<CatList[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      );
  },
});

export const { reducer } = catListSlice;
