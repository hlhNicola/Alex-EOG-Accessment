import React from 'react';
// import { useDispatch } from 'react-redux';
// import { actions } from './reducer';
import { Provider, createClient, useSubscription, defaultExchanges, subscriptionExchange } from 'urql';
// import { IState } from '../../store';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import { devtoolsExchange } from '@urql/devtools';
// import { createClient as createWSClient } from 'graphql-ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';


const subscriptionClient = new SubscriptionClient(
    "ws://react.eogresources.com/graphql",
    {
        reconnect: true
    }
)

const client = createClient({
url: 'https://react.eogresources.com/graphql',
exchanges: [
    // devtoolsExchange,
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
    if (!result.data) {
        return <p>No new messages</p>;
      }
    console.log(data)
    
    return(
        
        <ul>
            {data.newMeasurement.metric}= {data.newMeasurement.value} ,{data.newMeasurement.at}  
        </ul>
        
        )
}

// type measurement = {
//     metric: string;
//     at: number;
//     value: number;
//     unit: string
// }
  
