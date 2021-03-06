import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid } from '@material-ui/core';
import NewStudentModal from '../modals/NewStudentModal';
import ViewStudentModal from '../modals/ViewStudentModal';
import UpdateStudentModal from '../modals/UpdateStudentModal';
import DeleteStudentModal from '../modals/DeleteStudentModal';

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
    const [openViewStudent, setOpenViewStudent] = useState(false);
    const [openUpdateStudent, setOpenUpdateStudent] = useState(false);
    const [openDeleteStudent, setOpenDeleteStudent] = useState(false);

    useEffect(() => {
        if(props.location.state) {
            setUser(props.location.state.user);
        }
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
                <Button className={classes.button} onClick={() => setOpenUpdateStudent(true)}>
                    Update Student
                </Button>
                <Button className={classes.button} onClick={() => setOpenDeleteStudent(true)}>
                    Delete Student
                </Button>
                <Button className={classes.button} onClick={() => setOpenViewStudent(true)}>
                    View Student
                </Button>
            </Grid>
            <NewStudentModal open={openNewStudent} setOpen={setOpenNewStudent} />
            <ViewStudentModal open={openViewStudent} setOpen={setOpenViewStudent} />
            <UpdateStudentModal open={openUpdateStudent} setOpen={setOpenUpdateStudent} />
            <DeleteStudentModal open={openDeleteStudent} setOpen={setOpenDeleteStudent} />
        </Box>
    );
}

