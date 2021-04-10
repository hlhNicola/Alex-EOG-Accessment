import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";


const Chart = ({metric}: any) => {
  
    return (
      <ResponsiveContainer width={700} height="80%">
      <LineChart width={730} height={250} data={metric}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
       <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
      </ResponsiveContainer>
    );
  
}

export default Chart