import { createSlice, PayloadAction } from 'redux-starter-kit';


interface T {
  oilTempData: any[]
}

export type ApiErrorAction = {
  error: string;
};

const initialState: T = {
  oilTempData:[],
  // tubingPressu re: [],
  // casingPressure = {
  //   name: "casingPressure",
  //   utc: true,
  //   columns: ["time", "value", "unit"],
  //   points: new Array()
  // },
  // waterTemp:{
  //   name: "waterTemp",
  //   utc: true,
  //   columns: ["time", "value", "unit"],
  //   points: new Array()
  // },
  // injValueOpen = {
  //     name: "injValueOpen",
  //     utc: true,
  //     columns: ["time", "value", "unit"],
  //     points: new Array()
  // },
  // flareTemp = {
  //   name: "flareTemp",
  //   utc: true,
  //   columns: ["time", "value", "unit"],
  //   points: new Array()
  // }
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateOilTempData: (state, action: PayloadAction<any>) => {
  
      const newOilTemp:any[] = [...state.oilTempData, action.payload];
      state.oilTempData = newOilTemp
     
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;