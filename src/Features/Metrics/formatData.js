export default function measurementDataToChartFormat(getMultipleMeasurements){
    let data = getMultipleMeasurements;
    if (data.length === 0) {
      return [];
    }
    let metricLength = data[0].measurements.length;
    let formatedData = [];
    
    for (let index = 0; index < metricLength; index++) {
      let obj = {};
      for (let j = 0; j < data.length; j++) {
        obj[data[j].measurements[index].metric] =
          data[j].measurements[index].value;
        obj["name"] = data[j].measurements[index].at;
      }
      formatedData.push(obj);
    }
    return formatedData;
};

