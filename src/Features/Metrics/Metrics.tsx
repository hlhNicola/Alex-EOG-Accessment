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
query {
  getMetrics
}`


const getMetricsData = (state: IState) => {
  const { metrics } = state.metrics;
  return {
    metrics
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
 
  // let input = []
  const dispatch = useDispatch();
  const { metrics } = useSelector(getMetricsData);
  // const { heartBeat } = useSelector(getHeartBeatData);
  // const beforeTime = Date.now()
  // const afterTime = beforeTime - 30 * 60 * 1000
  
  // input = metrics.map(item => {
  //   return {
  //     metricName: item,
  //     after: afterTime,
  //     before: beforeTime
  //   }
  // })
  
  
  const [result] = useQuery({
    query,
    // variables: {
    //   input,
    // },
  });

  

  const { fetching, data, error } = result;
  useEffect(() => {

    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    const { getMetrics} = data;
    // const multiMeasurementsData = new Map()
    
    // getMultipleMeasurements.map((items: any) => {
      
    //   metrics.forEach((metric: string) => {
    //     if(items.metric === metric){
    //       let itemPoints: any = []
    //       items.measurements.forEach((measurement: any) => {
    //         itemPoints.push([measurement.at, measurement.value, measurement.unit])
    //       })
    //       multiMeasurementsData.set(metric, itemPoints)
    //     }
    //   })
    // })
    
    
    dispatch(actions.metricDataRecevied(getMetrics));
    // dispatch(actions.heartBeatDataRecevied(heartBeat));
    // dispatch(actions.measurementsDataRecevied(multiMeasurementsData))
  }, [dispatch, data, error]);
    if (fetching) return <LinearProgress />
  return <CustomizedHook metrics={metrics}/>;
};