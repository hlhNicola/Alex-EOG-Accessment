import { createSlice, PayloadAction } from 'redux-starter-kit';



export type ApiErrorAction = {
  error: string;
};

const initialState = {
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
  name: 'dashboard',
  initialState,
  reducers: {
    measurementsDataRecevied: (state, action: PayloadAction<any>) => {
      if(action.payload.metric === 'oilTemp'){
        state.oilTemp.points = [...state.oilTemp.points ,[action.payload.at, action.payload.value, action.payload.unit]]
      }
      if(action.payload.metric === 'tubingPressure'){
        state.tubingPressure.points = [...state.tubingPressure.points ,[action.payload.at, action.payload.value, action.payload.unit]]
      }
      if(action.payload.metric === 'casingPressure'){
        state.casingPressure.points = [...state.casingPressure.points ,[action.payload.at, action.payload.value, action.payload.unit]]
      }
      if(action.payload.metric === 'waterTemp'){
        state.waterTemp.points = [...state.waterTemp.points ,[action.payload.at, action.payload.value, action.payload.unit]]
      }
      if(action.payload.metric === 'injValueOpen'){
        state.injValueOpen.points = [...state.injValueOpen.points ,[action.payload.at, action.payload.value, action.payload.unit]]
      }
      if(action.payload.metric === 'flareTemp'){
        state.flareTemp.points = [...state.flareTemp.points ,[action.payload.at, action.payload.value, action.payload.unit]]
      }
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;