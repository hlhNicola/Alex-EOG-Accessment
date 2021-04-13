
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import Paper from './Paper';

const useStyles = makeStyles({
  paperContainer: {
    display: 'flex',
    width: '60%'
  },
});



const getSelectedMetricsData = (state: IState) => {
  const { selectedMetrics } = state.metrics;
  return {
    selectedMetrics
  };
};

// const getMeasurementsData = (state: IState) => {
//   const { measurements } = state.dashboard
//   return {
//     measurements
//   };
// }


const PaperContainer: React.FC = () => {
  const { selectedMetrics } = useSelector(getSelectedMetricsData)
  // const { measurements } = useSelector(getMeasurementsData)
  const classes = useStyles();
 
    
  const displayContent = selectedMetrics.map((metric:string) => {
    console.log(metric)
    
  })
  
  
  
  return (
  <div className={classes.paperContainer}>
    {displayContent}
  </div>
  );
};

export default PaperContainer;