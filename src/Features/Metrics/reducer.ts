import { createSlice, PayloadAction } from 'redux-starter-kit';



export type ApiErrorAction = {
  error: string;
};

interface Measurement {
  metric: string,
  at: number,
  value: number,
  unit: string
}

interface MultipleMeasurement {
  metric: string,
  measurements: Measurement[]
}

interface MetricState {
  metrics: string[],
  selectedMetrics: string[],
  multipleMeasurements: MultipleMeasurement[]
}


const initialState: MetricState = {
  metrics: [],
  selectedMetrics: [],
  multipleMeasurements: []
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload;
    },
    selectedMetricDataRecevied: (state, action: PayloadAction<string[]>) => {
      state.selectedMetrics = action.payload;
    },
    multipleDataRecevied: (state, action: PayloadAction<MultipleMeasurement[]>) => {
      state.multipleMeasurements = action.payload;
    },
    newMeasurementDataRecevied: (state, action: PayloadAction<Measurement>) => {
      if (state.multipleMeasurements.length > 0) {
        for (let i = 0; i < Object.keys(state.multipleMeasurements).length; i++) {
          if ( state.multipleMeasurements[i].metric === action.payload.metric) {
            state.multipleMeasurements[i].measurements.push(action.payload);
            state.multipleMeasurements[i].measurements.shift()
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