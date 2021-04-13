import React from "react";
import { useSelector } from 'react-redux'; 
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import moment from 'moment';
import { IState } from '../store';
import { getSelectedMetricsData } from '../Features/Metrics/Metrics';
import measurementDataToChartFormat from '../Features/Metrics/formatData';

function formatXAxis(tickItem: any) {
  tickItem = moment(parseInt(tickItem)).format("LT");
  return tickItem;
}

const getMultipleMeasurements = (state: IState) => {
  const { mutipleMeasurements } = state.metrics;
  return {
    mutipleMeasurements
  };
};




const Chart = () => {

const { selectedMetrics } = useSelector(getSelectedMetricsData)
const { mutipleMeasurements } = useSelector(getMultipleMeasurements);

  let formatedData:any = []
  if (mutipleMeasurements.length !== 0) {
    formatedData = measurementDataToChartFormat(
      mutipleMeasurements
    );
  }
  if(selectedMetrics.length === 0){
    return null
  }
  if (formatedData.length === 0) {
    return <div>NO DATA</div>;
  }

    return (
      <ResponsiveContainer width="90%" height="80%">
      <LineChart width={730} height={350} data={formatedData}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
        <XAxis 
          dataKey="name"  
          allowDataOverflow={true}
          tickFormatter={formatXAxis}/>
        <YAxis 
          domain={["auto", "auto"]}
          scale="linear"
          padding={{ top: 10, bottom: 10 }}
          tickCount={10}/>
        <Tooltip />
        <Legend />
        {selectedMetrics
            ? selectedMetrics.map((metric:string, index: number) => {
              let color = new Map()
              color.set(0, 'red')
              color.set(1, 'blue')
              color.set(2, 'green')
              color.set(3, 'purple')
              color.set(4, 'yellow')
              color.set(5, 'black')
                return (
                  <Line
                    type="monotone"
                    key={`${metric}`}
                    dataKey={`${metric}`}
                    strokeOpacity="1"
                    stroke={`${color.get(index)}`}
                    activeDot={{ r: 8 }}
                    isAnimationActive={false}
                    dot={false}
                  />
                );
              })
            : null} 
        
      </LineChart>
      </ResponsiveContainer>
    );
  
}

export default () => {
  return <Chart/>;
};
