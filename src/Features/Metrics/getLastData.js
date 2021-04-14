export default function getLastData(getMultipleMeasurements, selectedMetrics){
    let data = getMultipleMeasurements;
    if (data.length === 0) {
      return [];
    }
    let latestData = [];
    
    selectedMetrics.forEach(metric => {
        getMultipleMeasurements.forEach(multipleMetrics => {
            if (multipleMetrics.metric === metric){
                let temp = multipleMetrics.measurements.slice(-1)[0] 
                latestData.push([metric, temp.value + temp.unit])
            }
        })
    })
    return latestData
};