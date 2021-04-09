import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = string[]


export type ApiErrorAction = {
  error: string;
};

const initialState = {
  getMetrics: ['inital'] // string[]
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metric>) => {
  
      state.getMetrics = action.payload;
     
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;