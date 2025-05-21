import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthSlice } from "./features/authSlice";
import { StreamSlice } from "./features/streamSlice";
import { CollectionSlice } from "./features/collectionSlice";
import { IpsSlice } from "./features/ipsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    stream: StreamSlice.reducer,
    collection: CollectionSlice.reducer,
    ip: IpsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
