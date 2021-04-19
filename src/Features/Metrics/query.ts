export const getMetricsQuery = `
query{
  getMetrics
}`

export const getMultipleMeasurementsQuery = `
query ($input:[MeasurementQuery]){
  getMetrics
  getMultipleMeasurements(input: $input){
    metric
    measurements{
      metric
      at
      value
      unit
    }
  }
}`

export const getNewMeasurement = `
subscription {
    newMeasurement {
        metric
        at
        value
        unit
    }
}

`