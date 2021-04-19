import React from 'react';
import { useSelector } from 'react-redux';
import CustomizedHook from '../../components/AutoComplete';
import MetricCard from '../../components/MetricCard';
import getLastData from '../../utilities/getLastData';
import { useMetricList, useMultipleMeasurements, useNewMeasurements } from '../../services/metricServices';
import { getMetricsData, getMultipleMeasurements, getSelectedMetricsData } from './selector';




export default () => {
  return (
      <Metrics />
  );
};

const Metrics = () => {
  useMetricList()
  useMultipleMeasurements();
  useNewMeasurements();
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