import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authentication/authenticationService";

interface StreamState {
  isConnect: boolean;
  video: Record<string, unknown>;
  videoDetail: Record<string, unknown>;
}

const initialState: StreamState = {
  isConnect: false,
  video: {},
  videoDetail: {},
};

// Action pour récupérer le flux vidéo
export const fetchStreamVideo = createAsyncThunk(
  "stream/video_feed",
  async (token: string, ThunkApi) => {
    try {
      const response = await authService.get("/stream/video_feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return ThunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return ThunkApi.rejectWithValue(error);
    }
  }
);

export const StreamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    setIsConnectStream: (state, _action) => {
      state.isConnect = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStreamVideo.fulfilled, (state, action) => {
      state.isConnect = true;
      state.video = action.payload;
    });
    builder.addCase(fetchStreamVideo.rejected, (state) => {
      state.isConnect = false;
    });
  },
});
export default StreamSlice.reducer;
export const { setIsConnectStream } = StreamSlice.actions;
