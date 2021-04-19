export interface Measurement {
    metric: string,
    at: number,
    value: number,
    unit: string
  }
  
export interface MultipleMeasurement {
    metric: string,
    measurements: Measurement[]
}

export interface MetricState {
    metrics: string[],
    selectedMetrics: string[],
    multipleMeasurements: MultipleMeasurement[]
}