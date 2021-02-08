import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Button, Divider, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        background: '#ffad54',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
        color: 'white',
        fontSize: '12px',
        height: 30,
        width: '85%',
    },
}));

export default function ViewStudentPage(props) {
    const history = useHistory();
    const classes = useStyles();

    const [student, setStudent] = useState(null);

    useEffect(() => {
        setStudent(props.location.state[0]);
      }, []);

    useEffect(() => { 
        console.log("student: ", student); 
    }, [student]);

    return(
        <Box
            style={{
                padding: '1%'
            }}
        >
            <h1>View Student</h1>
            <Paper
                style={{
                    background: '#ffda8a',
                    width: '30%',
                    height: '40%'
                }}
                elevation={8}
            >
                <Grid container direction="column" align="left" spacing={1} style={{padding: '5%',}}>
                    <Grid item>
                        ID: {student.id}
                    </Grid>
                    <Grid item>
                        NAME: {student.firstName +" "+ student.lastName}
                    </Grid>
                    <Grid item>
                        MAJOR: {student.major}
                    </Grid>
                    <Grid item>
                        GPA: {student.gpa}
                    </Grid>
                    <Grid item>
                        DOB: {student.dob}
                    </Grid>
                    <Grid item>
                        EMAIL: {student.email}
                    </Grid>
                </Grid>
            </Paper>
            <h2>Grades</h2>
            <Paper
                style={{
                    marginTop: '3%',
                    padding: '3%',
                    background: '#ffda8a',
                    width: '70%',
                }}
                elevation={8}
            >
                <Grid container direction="row" align="center" spacing={2} style={{marginLeft: '7%',}}>
                    <Grid item xs={3}>Class Code</Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3}>Course</Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3}>Grade</Grid>
                </Grid>
                <Divider orientation="horizontal" flexItem />
                under
                <Grid container direction="column" spacing={2}>
                    
                </Grid>
            </Paper>
        </Box>
    );
}

