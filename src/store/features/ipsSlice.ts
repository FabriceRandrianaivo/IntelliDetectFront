import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
import authService from "../../services/authentication/authenticationService";
import { RootState } from "../store";
const isCookies = import.meta.env.VITE_IS_COOKIES;

export interface IpType {
  is_active: boolean;
  id: string;
  ip_address: string;
  // filename: string;
  collection_id:string;
  
}
export interface IpUpdateType {
  id: string;
  ip_address: string;
  collection_id:string;
}
export interface IpCreateType {
  payload: {
    collection_id:string;
  }
  ips: string;
}
export interface IpDeleteType {
  collection_id:string;
  ip_id: string;
}
export interface IpState {
  items: IpType[];
  activeIpIndex?: number;
  statusIpLoading?: boolean;
  fetchIpStatus: "idle" | "pending";
}
const initialState: IpState = {
  items: [],
  activeIpIndex: 0,
  statusIpLoading: false,
  fetchIpStatus:"idle"
};

export interface UpdateCollectionFileDto {
  collection_id: string;
  ip_id: string;
  ip_data: string;
}


export const createIp = createAsyncThunk(
  "collection/upload-ip",
  async (credential:IpCreateType, ThunkApi) => {
    try {
      const response = await authService.post("/collection/upload-ip", credential, {
      });
      return ThunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.error("Erreur dans la requête :", error);
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const fetchIP = createAsyncThunk(
  "collection/fetchById",
  async (collection_id: string, thunkAPI) => {
    try {
      const response = await authService.get(`/collection/${collection_id}/ips`);    
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


export const updateIpStatus = createAsyncThunk(
  "collection/updateIp",
  async (payload: IpUpdateType, { rejectWithValue }) => {
    try {
      await authService.put(`collections/${payload.collection_id}/ips/${payload.id}`, payload);
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


export const setActiveIpInd = createAsyncThunk(
  "collection/setActiveIp",
  async (ip_add: string, { getState }) => {
    const state = getState() as RootState;
    const index = state.ip.items.findIndex(
      (item) => item.ip_address === ip_add
    );

    return index !== -1 ? index : undefined;
  }
);

export const deleteIp = createAsyncThunk(
  "collection/Ip/delete",
  async (payload:IpDeleteType, ThunkApi) => {
    try {
      await authService.delete(`/collection/${payload.collection_id}/${payload.ip_id}`);
      return ThunkApi.fulfillWithValue({
        payload,
      });
    } catch (e) {
      if (isAxiosError(e)) {
        throw ThunkApi.rejectWithValue(JSON.stringify([e.response!.data]));
      }
    }
  }
);

// export const updateCollectionName = createAsyncThunk(
//   "collection/update/",
//   async (
//     payload: { collection_name: string; collection_id: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await authService.put(
//         `/collection/update/${payload.collection_id}`,
//         { collection_name: payload.collection_name }
//       );
//       return response.data;
//     } catch (e) {
//       if (isAxiosError(e)) {
//         return rejectWithValue((e as AxiosError).message);
//       } else {
//         console.log(
//           "Erreur de lors mise à jour du nom de la collection",
//           (e as Error).message
//         );
//       }
//     }
//   }
// );

export const setActiveIps = createAsyncThunk(
  "collection/setActiveIps",
  async (ip_address: string, { getState }) => {
    const state = getState() as RootState;
    const index = state.ip.items.findIndex(
      (item) => item.ip_address === ip_address
    );

    return index !== -1 ? index : undefined;
  }
);
export const IpsSlice = createSlice({
  name: "IPs_List",
  initialState,
  reducers: {
    setActiveIpIndex: (state, action) => {
      state.activeIpIndex = action.payload;
    },
    setIpItem: (state, action) => {
      state.items = action.payload;
    },
    setStatusIpLoading: (state, action) => {
      // state.statusLoading = action.payload;
      state.statusIpLoading = action.payload;
    },
    unsetActiveIpIndex: (state) => {
      state.activeIpIndex = undefined;
    },

  },

  extraReducers: (builder) => {
    builder.addCase(setActiveIps.fulfilled, (state, action) => {
      
      state.activeIpIndex = action.payload;
    });
    builder.addCase(fetchIP.pending, (state) => {
      state.fetchIpStatus = "pending";
    });
    builder.addCase(fetchIP.fulfilled, (state, action) => {
      const newItems = action.payload;      
      state.items = newItems;
      state.fetchIpStatus = "idle";
    });
    builder.addCase(fetchIP.rejected, (state) => {
      state.fetchIpStatus = "idle";
    });
    builder.addCase(createIp.fulfilled, (state, _) => {
      state.statusIpLoading = false;
    });
    builder.addCase(createIp.rejected, (state, _) => {
      state.statusIpLoading = false;
    });
    builder.addCase(deleteIp.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload?.ip_id
      );
    });
  },
});
export const selectActiveIp = (state: RootState) => {
  const { activeIndex, items } = state.collection;
  return activeIndex !== undefined ? items[activeIndex] : null;
};
export const {
  setActiveIpIndex,
  setIpItem,
  unsetActiveIpIndex,
  setStatusIpLoading,
} = IpsSlice.actions;
export default IpsSlice.reducer;
