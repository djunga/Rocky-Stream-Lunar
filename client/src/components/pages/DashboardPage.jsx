import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid } from '@material-ui/core';
import NewStudentModal from '../modals/NewStudentModal';

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
    const history = useHistory();
    const classes = useStyles();

    const [user, setUser] = useState(null);
    const [openNewStudent, setOpenNewStudent] = useState(false);

    useEffect(() => {
        setUser(props.location.state.user);
      }, []);

    useEffect(() => { 
        console.log("user: ", user); 
    }, [user]);

    return(
        <Box
            style={{
                padding: '1%'
            }}
        >
            <Grid container direction="column" spacing={3}>
                <Button className={classes.button} onClick={() => setOpenNewStudent(true)}>
                    New Student
                </Button>
                <Button className={classes.button}>
                    Update Student
                </Button>
                <Button className={classes.button}>
                    Delete Student
                </Button>
                <Button className={classes.button}>
                    View Student
                </Button>
                <Button className={classes.button}>
                    Log out
                </Button>
            </Grid>
            <NewStudentModal open={openNewStudent} setOpen={setOpenNewStudent} aria-labelledby="form-dialog-title">

            </NewStudentModal>
        </Box>
    );
}

