import { IState } from '../../store';

export const getSelectedMetricsData = (state: IState) => {
    const { selectedMetrics } = state.metrics;
    return {
      selectedMetrics
    };
  };
  
export  const getMetricsData = (state: IState) => {
    const { metrics } = state.metrics;
    return {
      metrics
    };
  };
  
export  const getMultipleMeasurements = (state: IState) => {
    const { multipleMeasurements } = state.metrics;
    return {
      multipleMeasurements
    };
  };