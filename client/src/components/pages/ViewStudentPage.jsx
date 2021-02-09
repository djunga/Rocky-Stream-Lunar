import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Grid, Paper } from '@material-ui/core';
import GradeCard from '../GradeCard';
import Axios from 'axios';

export default function ViewStudentPage(props) {
    const [student, setStudent] = useState(null);
    const [grades, setGrades] = useState(null);

    useEffect(() => {
        //console.log(props);
        if(props.location.state) {
            setStudent(props.location.state[0]);
        }
      }, []);

    useEffect(() => {
        const url = props.location.pathname;
        var len = props.location.pathname.length;
        len = len - 9;
        const id = url.substring(len, );
        Axios.post(`http://localhost:3001/viewstudent/${id}`, {
            student_id: id,
            
        }).then((result) => {
            if(result.data == "DNE") {
                console.log("There is no student with this ID.");
            }
            else {
                console.log(result);
                console.log(result.data.result);
                setGrades(result.data.result);
            }
        });
      }, []);

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
                        ID: {student?.id}
                    </Grid>
                    <Grid item>
                        NAME: {student?.firstName +" "+ student?.lastName}
                    </Grid>
                    <Grid item>
                        MAJOR: {student?.major}
                    </Grid>
                    <Grid item>
                        GPA: {student?.gpa}
                    </Grid>
                    <Grid item>
                        DOB: {student?.dob}
                    </Grid>
                    <Grid item>
                        EMAIL: {student?.email}
                    </Grid>
                </Grid>
            </Paper>
            <h2>Grades</h2>
            <Paper
                style={{
                    marginTop: '3%',
                    padding: '3%',
                    background: '#ffda8a',
                    width: '50%',
                }}
                elevation={8}
            >
                <Grid container direction="row" align="center" spacing={2} style={{marginLeft: '11%',}}>
                    <Grid item xs={3}>Class Code</Grid>
                    <Grid item xs={3}>Course</Grid>
                    <Grid item xs={3}>Grade</Grid>
                </Grid>
                <Divider orientation="horizontal" flexItem />
                <Grid container direction="column" spacing={2}>
                    {grades?.map((r, index) => 
                        <Grid container item direction="column" xs={12} alignItems="center" spacing={1} key={index}>
                            <GradeCard g={r} />
                        </Grid>
                        )
                    }
                </Grid>
            </Paper>
        </Box>
    );
}

