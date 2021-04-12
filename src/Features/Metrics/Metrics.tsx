import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../../store';
import CustomizedHook from '../../components/AutoComplete';
import LinearProgress from '@material-ui/core/LinearProgress';


const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});


const query = `
query ($input: [MeasurementQuery]){
  getMetrics
  heartBeat
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}`


const getMetricsData = (state: IState) => {
  const { metrics } = state.metrics;
  return {
    metrics
  };
};

const getHeartBeatData = (state: IState) => {
  const { heartBeat } = state.metrics;
  return {
    heartBeat
  };
};

const getMultipleMeasurementsData = (state: IState) => {
  const { multiMeasurements } = state.metrics;
  return {
    multiMeasurements
  };
};

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
 
  let input = []
  const dispatch = useDispatch();
  const { metrics } = useSelector(getMetricsData);
  input = metrics.map(item => {
    return {
      metricName: item
    }
  })


  const { heartBeat } = useSelector(getHeartBeatData);
  
  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });

  

  const { fetching, data, error } = result;
  useEffect(() => {

    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    const { getMetrics, heartBeat, multiMeasurements} = data;
    console.log(data)
    dispatch(actions.metricDataRecevied(getMetrics));
    dispatch(actions.heartBeatDataRecevied(heartBeat));
    dispatch(actions.getMultipleMeasurementsData(multiMeasurements));
  }, [dispatch, data, error]);
    if (fetching) return <LinearProgress />
  return <CustomizedHook metrics={metrics}/>;
};