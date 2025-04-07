import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
// import { ToastContextType } from "../../context/toastContext";
import authService from "../../services/authentication/authenticationService";
import { RootState } from "../store";
const isCookies = import.meta.env.VITE_IS_COOKIES;

console.log("isCookies", isCookies);
export interface PayloadCollectionUpload {
  payload: {
    collection_id: string;
  };
  // files: File[];
  urls: string[];
  // toast_context: ToastContextType;
}
export interface PayloadCollection {
  payload: {
    collection_name: string;
  };
  // files: File[];
  // urls: string[];
  // toast_context?: ToastContextType;
}
export interface FileType {
  is_active: boolean;
  id: string;
  collection_id: string;
  filename: string;
}
export interface CollectionItem {
  id: string;
  collection_name: string;
  is_public: boolean;
  // collection_files?: FileType[];
  collection_ips?: string[];
  is_private: boolean;
}
export interface CollectionState {
  items: CollectionItem[];
  activeIndex?: number;
  statusLoading?: boolean;
  fetchStatus: "idle" | "pending";
}
const initialState: CollectionState = {
  items: [],
  activeIndex: 0,
  statusLoading: false,
  fetchStatus:"idle"
};

export interface UpdateCollectionFileDto {
  collection_id: string;
  collection_file_id: string;
  status: number;
}

export interface UpdateCollectionUrlsDto {
  collection_id: string;
  collection_url_id: string;
  status: number;
}

export const createCollection = createAsyncThunk(
  "collection/create",
  async (collection: PayloadCollection, ThunkApi) => {
    try {
      const { payload} = collection;
      const response = await authService.post("/collection/", payload, {
      });
      return ThunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.error("Erreur dans la requête :", error);
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const fetchLastCollections = createAsyncThunk(
  "collection/fetchlastCollections",
  async (_, ThunkAPI) => {
    try {
      const response = await authService.get("/collection/last-used");
      return ThunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);


export const fetchCollectionById = createAsyncThunk(
  "collection/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await authService.get(`/collection/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue((error as Error).message);
      }
    }
  }
);

export const fetchCollection = createAsyncThunk(
  "collection/fetch",
  async () => {
    try {
      const response = await authService.get("/collection/");
      return response.data;
    } catch (e) {
      console.log((e as Error).message);
      throw e;
    }
  }
);

export const updateIpStatus = createAsyncThunk(
  "collection/updateUrlsStatus",
  async (payload: UpdateCollectionUrlsDto, { rejectWithValue }) => {
    try {
      await authService.put("collection/ips", payload);
      return payload;
    } catch (e) {
      if (isAxiosError(e)) {
        return rejectWithValue((e as AxiosError).message);
      } else {
        console.log(
          "Erreur de mise à jour du statut de l'ips",
          (e as Error).message
        );
      }
    }
  }
);


export const setActiveCollection = createAsyncThunk(
  "collection/setActiveCollection",
  async (collection_name: string, { getState }) => {
    const state = getState() as RootState;
    const index = state.collection.items.findIndex(
      (item) => item.collection_name === collection_name
    );

    return index !== -1 ? index : undefined;
  }
);

export const deleteCollection = createAsyncThunk(
  "collection/delete",
  async (collection_id: string, ThunkApi) => {
    try {
      await authService.delete(`/collection/${collection_id}`);
      return ThunkApi.fulfillWithValue({
        collection_id: collection_id,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        throw ThunkApi.rejectWithValue(JSON.stringify([e.response!.data]));
      }
    }
  }
);

export const updateCollectionName = createAsyncThunk(
  "collection/update/",
  async (
    payload: { collection_name: string; collection_id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.put(
        `/collection/update/${payload.collection_id}`,
        { collection_name: payload.collection_name }
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        return rejectWithValue((e as AxiosError).message);
      } else {
        console.log(
          "Erreur de lors mise à jour du nom de la collection",
          (e as Error).message
        );
      }
    }
  }
);

export const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setActiveCollectionIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    setCollectionItem: (state, action) => {
      state.items = action.payload;
    },
    setStatusLoading: (state, action) => {
      // state.statusLoading = action.payload;
      state.statusLoading = action.payload;
    },
    unsetActiveCollectionIndex: (state) => {
      state.activeIndex = undefined;
    },

  },

  extraReducers: (builder) => {
    builder.addCase(setActiveCollection.fulfilled, (state, action) => {
      state.activeIndex = action.payload;
    });
    builder.addCase(fetchCollection.pending, (state) => {
      state.fetchStatus = "pending";
    });
    builder.addCase(fetchCollection.fulfilled, (state, action) => {
      const newItems = action.payload.data;
      state.items = newItems;
      state.fetchStatus = "idle";
    });
    builder.addCase(fetchCollection.rejected, (state) => {
      state.fetchStatus = "idle";
    });
    builder.addCase(createCollection.fulfilled, (state, _) => {
      state.statusLoading = false;
    });
    builder.addCase(createCollection.rejected, (state, _) => {
      state.statusLoading = false;
    });
    builder.addCase(deleteCollection.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload?.collection_id
      );
    });
  },
});
export const selectActiveCollection = (state: RootState) => {
  const { activeIndex, items } = state.collection;
  return activeIndex !== undefined ? items[activeIndex] : null;
};
export const {
  setActiveCollectionIndex,
  setCollectionItem,
  unsetActiveCollectionIndex,
  setStatusLoading,
} = CollectionSlice.actions;
export default CollectionSlice.reducer;
