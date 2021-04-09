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
}
`;

const getMetricsData = (state: IState) => {
  const { getMetrics } = state.metric;
  return {
    getMetrics
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
  
  const dispatch = useDispatch();
  const { getMetrics } = useSelector(getMetricsData);

  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;
  useEffect(() => {

    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    const { getMetrics } = data;
    dispatch(actions.metricDataRecevied(getMetrics));
  }, [dispatch, data, error]);

    if (fetching) return <LinearProgress />
  return <CustomizedHook metrics={getMetrics}/>;
};