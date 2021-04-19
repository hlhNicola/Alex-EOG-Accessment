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
import { getSelectedMetricsData } from '../Features/Metrics/selector';
import measurementDataToChartFormat from '../utilities/formatData';
import LinearProgress  from '@material-ui/core/LinearProgress';


const toolTipWrapperStyle = {
  color: "#9F9FA2", 
  fontSize:"10px", 
};

const toolTipContentStyle = {
  paddingLeft: "5px",
  height: "auto",
  backgroundColor: "white",
  border: "2px solid #9F9FA2",
  width: "150px",
  borderRadius: "5px",
  padding: "0px",
  opacity:".9",
};

const toolTipLabelStyle = {
  fontSize: "10px",
  margin: "-15px 0 10px -10px",
  color: "#767778",
};

const toolTipItemStyle = { 
  color: "#767778",
  marginTop: '-10px'
};

function formatXAxis(tickItem: string) {
  tickItem = moment(parseInt(tickItem)).format("LT");
  return tickItem;
}

const getMultipleMeasurements = (state: IState) => {
  const { multipleMeasurements } = state.metrics;
  return {
    multipleMeasurements
  };
};

export default function Chart() {
  const { selectedMetrics } = useSelector(getSelectedMetricsData)
  const { multipleMeasurements } = useSelector(getMultipleMeasurements);
  const labelFormat = (e: number) => {
    return moment(e).format("lll")
  };

  let formatedData: any[] = []
  if (multipleMeasurements.length !== 0) {
    formatedData = measurementDataToChartFormat(
      multipleMeasurements
    );
  }

  if(selectedMetrics.length === 0){
    return null
  }
  if (formatedData.length === 0) {
    return <LinearProgress  />;
  }

  return (
    <ResponsiveContainer width="95%" height="90%">
    <LineChart 
      data={ formatedData }
      margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
      <XAxis 
        dataKey="name"  
        allowDataOverflow={true}
        tickFormatter={formatXAxis}/>
      <YAxis 
        domain={["auto", "auto"]}
        scale="linear"
        padding={{ top: 10, bottom: 10 }}
        tickCount={10}/>
      <Tooltip 
        wrapperStyle={toolTipWrapperStyle}
        contentStyle={toolTipContentStyle}
        labelStyle={toolTipLabelStyle}
        itemStyle={toolTipItemStyle}
        labelFormatter= {labelFormat}
        />
      <Legend />
      {selectedMetrics
          ? selectedMetrics.map((metric:string, index: number) => {
            let color = new Map()
            color.set(0, '#A80100')
            color.set(1, 'blue')
            color.set(2, 'green')
            color.set(3, 'purple')
            color.set(4, '#F76300')
            color.set(5, 'black')
              return (
                <Line
                  type="monotone"
                  key={`${metric}`}
                  dataKey={`${metric}`}
                  strokeOpacity="1"
                  stroke={`${color.get(index)}`}
                  activeDot={ false }
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
