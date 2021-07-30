import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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

export default function DashboardPage(props) {
    const [courses, setCourses] = useState([])
        
    useEffect(() => {

    }, []) 

    return(
        <Box
            style={{
                padding: '1%'
            }}
        >
            <Grid container direction="column" spacing={3}>
                <Box>
                    <TextField label="Search" variant="outlined" />
                </Box>
            </Grid>
        </Box>
    );
}