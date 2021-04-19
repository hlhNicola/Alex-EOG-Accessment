import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/Metrics/reducer';
import { useQuery, useSubscription } from 'urql';
import { getMetricsQuery, getMultipleMeasurementsQuery, getNewMeasurement } from '../Features/Metrics/query';
import { getSelectedMetricsData } from '../Features/Metrics/selector';

const beforeTime = Date.now()
const afterTime = beforeTime - 30 * 60 * 1000

export const useMetricList = () => {
    const dispatch = useDispatch();
    let [ result ] = useQuery({
      query: getMetricsQuery
    });
    const { fetching, data, error } = result;
  
    useEffect(() => {
      if (error) {
        dispatch(actions.metricApiErrorReceived({ error: error.message }));
        return;
      }
      if (!data) {
        return;
      }
      if (fetching) {
        return;
      }
      const { getMetrics } = data;
      dispatch(actions.metricDataRecevied(getMetrics));
    }, [dispatch, data, error, fetching]);
  };
  
export const useMultipleMeasurements = () => {
    const { selectedMetrics } = useSelector(getSelectedMetricsData);
    let input = selectedMetrics.map((item: string) => {
      return {
        metricName: item,
        after: afterTime,
        before: beforeTime
      }
    })
  
    const dispatch = useDispatch();
    let [ result ] = useQuery({
      query: getMultipleMeasurementsQuery,
      variables: {
        input,
      }
    });
    
    const { fetching, data, error } = result;
    useEffect(() => {
      if (error) {
        dispatch(actions.metricApiErrorReceived({ error: error.message }));
        return;
      }
      if (!data) {
        return;
      }
      if (fetching) {
        return;
      }
      const { getMultipleMeasurements } = data;
      dispatch(actions.multipleDataRecevied(getMultipleMeasurements));
    }, [dispatch, data, error, fetching]);
  };
  
export const useNewMeasurements = () => {
    const [ result ] = useSubscription({ query: getNewMeasurement, variables:{} });
    const { fetching, data, error } = result;
    const dispatch = useDispatch()
  
    useEffect(() => {
      if (error) {
        dispatch(actions.metricApiErrorReceived({ error: error.message }));
        return;
      }
      if (!data) {
        return;
      }
      if (fetching) {
        dispatch(actions.newMeasurementDataRecevied(data.newMeasurement))
        return;
      }
    }, [dispatch, data, error, fetching]);
  }
  