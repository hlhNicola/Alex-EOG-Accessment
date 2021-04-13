import React from "react";
import _ from "underscore";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";



const Chart = () => {
 
    return (
      <ResponsiveContainer width={700} height="80%">
      <LineChart width={730} height={250} data={[]}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="at" />
        <YAxis/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" scale="time" />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
      </ResponsiveContainer>
    );
  
}

export default Chart