import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery, useSubscription } from 'urql';
import { IState } from '../../store';
import CustomizedHook from '../../components/AutoComplete';
import MetricCard from '../../components/MetricCard';
import getLastData from '../../utilities/getLastData';

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

export const getSelectedMetricsData = (state: IState) => {
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

const getMultipleMeasurements = (state: IState) => {
  const { multipleMeasurements } = state.metrics;
  return {
    multipleMeasurements
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
  let input = selectedMetrics.map((item: string) => {
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
  const [result] = useSubscription({ query: getNewMeasurement, variables:{} });
  const { fetching, data, error } = result;
  const dispatch = useDispatch()

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
   
    dispatch(actions.newMeasurementDataRecevied(data.newMeasurement));
  }, [dispatch, data, error, fetching]);
}

const Metrics = () => {

  GetMetricList()
  GetMultipleMeasurements();
  GetNewMeasurements();
  const { metrics } = useSelector(getMetricsData);
  const { multipleMeasurements } = useSelector(getMultipleMeasurements);
  const { selectedMetrics } = useSelector(getSelectedMetricsData);
  let latestData = getLastData(multipleMeasurements, selectedMetrics)
  const MetricCards = latestData.map((data: string[]) => {
    return <MetricCard key={data[0]} data={ data }/>
  })

  return (
  <div style={{padding: "2%"}}>
    <div style={{display: "flex"}}>
      <div style={{flex: 3, display: 'flex',  flexWrap: "wrap"}}>
        { MetricCards }
      </div>
      <CustomizedHook metrics={metrics} style={{flex: 2}}/>
    </div>
  </div>)
};