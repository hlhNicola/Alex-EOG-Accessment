import { MultipleMeasurement } from '../Features/Metrics/model'

export default function getLastData(getMultipleMeasurements:MultipleMeasurement[], selectedMetrics:string[]){
    let data = getMultipleMeasurements;
    if (data.length === 0) {
      return [];
    }
    let latestData:string[][] = [];
    
    selectedMetrics.forEach((metric: string) => {
        getMultipleMeasurements.forEach(multipleMetrics => {
            if (multipleMetrics.metric === metric){
                let temp = multipleMetrics.measurements.slice(-1)[0] 
                latestData.push([metric, temp.value + temp.unit])
            }
        })
    })
    return latestData
};