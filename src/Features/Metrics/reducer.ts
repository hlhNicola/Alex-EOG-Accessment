import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = string[]
export type HeartBeat = number


export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: new Array(),
  heartBeat: 0,
  oilTemp:[],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metric>) => {
      state.metrics = action.payload;
    },
    heartBeatDataRecevied: (state, action: PayloadAction<HeartBeat>) => {
      state.heartBeat = action.payload;
    },
    oilTempDataRecevied: (state, action: PayloadAction<any>) => {
      state.oilTemp = action.payload;
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;