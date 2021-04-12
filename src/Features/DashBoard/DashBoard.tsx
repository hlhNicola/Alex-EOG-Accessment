import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
import { IState } from '../../store';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { devtoolsExchange } from '@urql/devtools';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import Chart from '../../components/Chart';


const subscriptionClient = new SubscriptionClient(
    "ws://react.eogresources.com/graphql",
    {
        reconnect: true
    }
)

const client = createClient({
url: 'https://react.eogresources.com/graphql',
exchanges: [
    devtoolsExchange,
    ...defaultExchanges,
    subscriptionExchange({
        forwardSubscription: operation => subscriptionClient.request(operation)
    })
]
});
  

const newMeasurement = `
    subscription {
        newMeasurement {
            metric
            at
            value
            unit
        }
    }
    
`;
const getDashBoardData = (state: IState) => {
    const dashBoardData = state.dashboard;
    return {
        dashBoardData,
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
      <Provider value={client}>
        <DashBoard />
      </Provider>
    );
  };

  const DashBoard = () => {
  
    const [result] = useSubscription({ query: newMeasurement });
    const { fetching, data, error } = result;
    const dispatch = useDispatch()
    const dashBoardGraghData = useSelector(getDashBoardData)
    const {metrics} = useSelector(getMetricsData)
    const newMeasurementsData = new Map()

    useEffect(() => {
        if (data && data.newMeasurement && data.newMeasurement.metric) {
            dispatch(actions.measurementsDataRecevied(data.newMeasurement));
        }
    }, [dispatch, data, error]);
      
    
    return(
        <div />
            // <Chart metric={oilTempDataGraghData.oilTempData}/>
        
        )
}

// type measurement = {
//     metric: string;
//     at: number;
//     value: number;
//     unit: string
// }
  
