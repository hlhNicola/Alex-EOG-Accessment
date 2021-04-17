import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 240,
    height: 120,
    padding: 10,
    margin: "0 10px 10px 0"
  },
});


export default function MetricCard( { data }: any ) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='body1'>
          {data[0]}
        </Typography>
        <Typography variant="h4" >  
          {data[1]}
        </Typography>
      </CardContent>
    </Card>
  );
}