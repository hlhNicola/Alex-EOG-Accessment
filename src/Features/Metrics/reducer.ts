import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = string[]
export type HeartBeat = number


export type ApiErrorAction = {
  error: string;
};

interface T  {
  metrics: string[],
  selectedMetrics: string[],
  mutipleMeasurements: any[]
}



const initialState: T = {
  metrics: [],
  selectedMetrics: [],
  mutipleMeasurements: []
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<any>) => {
      state.metrics = action.payload;
    },
    selectedMetricDataRecevied: (state, action: PayloadAction<any>) => {
      state.selectedMetrics = action.payload;
    },
    multipleDataRecevied: (state, action: PayloadAction<any>) => {
      state.mutipleMeasurements = action.payload;
    },
    newMeasurementDataRecevied: (state, action: PayloadAction<any>) => {
      if (state.mutipleMeasurements.length > 0) {
        for (let i = 0; i < Object.keys(state.mutipleMeasurements).length; i++) {
          if ( state.mutipleMeasurements[i].metric === action.payload.metric) {
            state.mutipleMeasurements[i].measurements.push(action.payload);
            state.mutipleMeasurements[i].measurements.shift()
          }
        }
      }
    },
 
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    selectedMetricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    multipleDataApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    newMeasurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;