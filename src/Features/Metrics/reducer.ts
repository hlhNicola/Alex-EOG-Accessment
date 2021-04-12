import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = string[]
export type HeartBeat = number


export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: new Array(),
  oilTemp:{
    name: "oilTempData",
    utc: true,
    columns: ["time", "value", "unit"],
    points: new Array()
  },
  tubingPressure: {
    name: "tubingPressure",
    utc: true,
    columns: ["time", "value", "unit"],
    points: new Array()
  },
  casingPressure: {
    name: "casingPressure",
    utc: true,
    columns: ["time", "value", "unit"],
    points: new Array()
  },
  waterTemp:{
    name: "waterTemp",
    utc: true,
    columns: ["time", "value", "unit"],
    points: new Array()
  },
  injValueOpen: {
      name: "injValueOpen",
      utc: true,
      columns: ["time", "value", "unit"],
      points: new Array()
  },
  flareTemp: {
    name: "flareTemp",
    utc: true,
    columns: ["time", "value", "unit"],
    points: new Array()
  }
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metric>) => {
      state.metrics = action.payload;
    },
    // heartBeatDataRecevied: (state, action: PayloadAction<HeartBeat>) => {
    //   state.heartBeat = action.payload;
    // },
    measurementsDataRecevied: (state, action: PayloadAction<any>) => {
      state.oilTemp.points = action.payload.get("oilTemp")
      state.tubingPressure.points = action.payload.get("tubingPressure")
      state.casingPressure.points = action.payload.get("casingPressure")
      state.waterTemp.points = action.payload.get("waterTemp")
      state.injValueOpen.points = action.payload.get("injValueOpen")
      state.flareTemp.points = action.payload.get("flareTemp")
    },
    tubingPressureDataRecevied: (state, action: PayloadAction<any>) => {
      state.tubingPressure.points = action.payload;
    },
    // waterTempDataRecevied: (state, action: PayloadAction<any>) => {
    //   state.waterTemp.points = action.payload;
    // },
    // injValueOpenDataRecevied: (state, action: PayloadAction<any>) => {
    //   state.injValueOpen.points = action.payload;
    // },
    // casingPressureDataRecevied: (state, action: PayloadAction<any>) => {
    //   state.casingPressure.points = action.payload;
    // },
    // flareTempDataRecevied: (state, action: PayloadAction<any>) => {
    //   state.flareTemp.points = action.payload;
    // },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;