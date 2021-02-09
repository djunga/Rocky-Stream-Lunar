import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '3%',
        backgroundColor: '#ffda8a',
        padding: '3%',
        width: '70%',
        //border: '4px solid '#ffda8a,

    },
    box: {
        border: '4px dashed black',
        padding: '3%',
        minWidth: '40%'
    },
  }));

export default function GradeCard(props) {
    const classes = useStyles();
    const { g } = props;

    const [grade, setGrade] = useState(null);

    useEffect(() => {
        setGrade(g);
      }, []);

    useEffect(() => { 
        console.log("grade: ", grade); 
    }, [grade]);

    return(
        <Paper
            elevation={2}
            className={classes.paper}
        >
            <Grid container direction="row" spacing={1}>
                <Grid item xs={4}>{grade?.class_code}</Grid>
                <Grid item xs={4}>{grade?.category +" "+ grade?.code}</Grid>                    
                <Grid item xs={4}>{grade?.letter}</Grid>
            </Grid>
        </Paper>
    );
}
