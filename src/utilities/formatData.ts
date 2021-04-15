import { MultipleMeasurement } from '../Features/Metrics/reducer'

export default function measurementDataToChartFormat(getMultipleMeasurements: MultipleMeasurement[]){
    let data = getMultipleMeasurements;
    if (data.length === 0) {
      return [];
    }
    let metricLength = data[0].measurements.length;
    let formatedData = [];
    
    for (let index = 0; index < metricLength; index++) {
      let obj:{[k:string]: number} = {};
      data.forEach((multipleMeasurement: MultipleMeasurement) => {
        obj[multipleMeasurement.measurements[index].metric] = multipleMeasurement.measurements[index].value
        obj["name"] = multipleMeasurement.measurements[index].at;
      })
      formatedData.push(obj);
    }
    return formatedData;
};

