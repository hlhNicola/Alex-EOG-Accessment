import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery, useSubscription } from 'urql';
import { IState } from '../../store';
import CustomizedHook from '../../components/AutoComplete';

const beforeTime = Date.now()
const afterTime = beforeTime - 30 * 60 * 1000

const getMetricsQuery = `
query{
  getMetrics
}`

const getMultipleMeasurementsQuery = `
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

const getNewMeasurement = `
subscription {
    newMeasurement {
        metric
        at
        value
        unit
    }
}

`

const getSelectedMetricsData = (state: IState) => {
  const { selectedMetrics } = state.metrics;
  return {
    selectedMetrics
  };
};

const getMetricsData = (state: IState) => {
  const { metrics } = state.metrics;
  return {
    metrics
  };
};

export default () => {
  return (
      <Metrics />
  );
};

const GetMetricList = () => {
  
  const dispatch = useDispatch();
  let [result] = useQuery({
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
    const {getMetrics} = data;
    dispatch(actions.metricDataRecevied(getMetrics));
  }, [dispatch, data, error, fetching]);
};

const GetMultipleMeasurements = () => {

  const { selectedMetrics } = useSelector(getSelectedMetricsData);
  
  let input = selectedMetrics.map(item => {
    return {
      metricName: item,
      after: afterTime,
      before: beforeTime
    }
  })

  const dispatch = useDispatch();
  let [result] = useQuery({
    query: getMultipleMeasurementsQuery,
    variables: {
      input,
    }
  });
  
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.multipleDataApiErrorReceived({ error: error.message }));
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

const GetNewMeasurements = () => {
  console.log('1')
  const [result] = useSubscription({ query: getNewMeasurement, variables:{} });
  const { fetching, data, error } = result;
  const dispatch = useDispatch()

  useEffect(() => {
    if (data && data.newMeasurement && data.newMeasurement.metric) {
      dispatch(actions.newMeasurementDataRecevied(data.newMeasurement));
  }
  }, [dispatch, data, error, fetching]);
}

const Metrics = () => {
 
  GetMetricList()
  GetMultipleMeasurements();
  GetNewMeasurements();
  const { metrics } = useSelector(getMetricsData);
  
  return <CustomizedHook metrics={metrics}/>;
};