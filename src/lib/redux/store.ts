import { configureStore } from "@reduxjs/toolkit";
import { reducer as loginReducer } from "./login-slice";
import { reducer as activeTabReducer } from "./active-tab-slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    activeTab: activeTabReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
