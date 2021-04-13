import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiPaper from '@material-ui/core/Paper';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiTypography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    color: "rgba(0, 0, 0, 0.87)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "#fff",
    height: 121.6,
    width: 254.88,
    fontFamily: "Rubik"
  },
  
  CardContent: {
    padding: 16,
    paddingBottom: 24

  },

  MuiTypographyH6: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  },
  MuiTypographyH3:{
    fontSize: "3rem",
    fontWeight: 400,
    lineHeight: 1.04,
    letterSpacing: "0em",
  }
});

export default function Paper() {
  const classes = useStyles();

  return (
    <MuiPaper className={classes.root}>
      <MuiCardContent className={classes.CardContent}>
        <MuiTypography className={classes.MuiTypographyH6}>
          lala
        </MuiTypography>
        
        <MuiTypography className={classes.MuiTypographyH3}>
          haha
        </MuiTypography>
       
      </MuiCardContent>
     
    </MuiPaper>
  );
}