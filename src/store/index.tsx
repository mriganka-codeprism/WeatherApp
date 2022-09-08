import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Weather_info {
  temp: number;
  feels_like: number;
  max_temp: number;
  min_temp: number;
  humidity: number;
  icon: string | null;
  location: string | null;
  description: string | null;
}

interface Initialstate {
  data: Weather_info;
}

const initialState: Initialstate = {
  data: {
    temp: 0,
    feels_like: 0,
    max_temp: 0,
    min_temp: 0,
    humidity: 0,
    description: null,
    location: null,
    icon: null,
  },
};

const item_slice = createSlice({
  name: "itemsReducer",
  initialState,
  reducers: {
    updateTemp(state, action: PayloadAction<Weather_info>) {
      state.data = action.payload;
    },
  },
});

const index = configureStore({
  reducer: {
    items: item_slice.reducer,
  },
});

export const item_actions = item_slice.actions;

export type Reduxstate = ReturnType<typeof index.getState>;

export default index;
