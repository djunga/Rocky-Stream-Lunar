import React, {useState} from 'react';
import { Backdrop, Button, Fade, Grid, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    textfield: {
        background: 'white', 
        width: '50%', 
        margin: '1%', 
        border: '2px solid black', 
        borderRadius: 4,
    },
}));

function NewStudentModal(props) {
    const classes = useStyles();

    const { open, setOpen } = props;

    const [id, setId] = useState("101902284");
    const [firstName, setFirstName] = useState('Emily');
    const [lastName, setLastName] = useState('Chen');
    const [dob, setDob] = useState('2003-12-09');
    const [major, setMajor] = useState('SOC');
    const [gpa, setGpa] = useState(3.88);
    const [email, setEmail] = useState('emily.chen@rockystream.edu');

    const handleId = (e) => setId(e.target.value);
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleDob = (e) => 
    {
        setDob(e.target.value);
        console.log(e.target.value);
    }
    const handleMajor = (e) => setMajor(e.target.value);
    const handleGpa = (e) => {
        setGpa(parseFloat(e.target.value));
        console.log("", parseFloat(e.target.value));
    }
    const handleEmail = (e) => setEmail(e.target.value);

    const closeModal = () => { setOpen(false); }

    const submit = () => {
        Axios.post("http://localhost:3001/newstudent", {
            id: id,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            major: major,
            gpa: gpa,
            email: email,
            
        }).then((result) => {
            if(result.data == "DUPLICATE_STUDENT") {
                console.log("A student with this ID already exists. Choose another.");
            }
            else {
                console.log("Student with id " + id + " successfully inserted.");
                closeModal();
            }
        });
    }

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={closeModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Grid container direction="column" align="left" spacing={2} style={{ backgroundColor:'#80848a', height: '80%', width: '70%', padding: '2%', border: '1px solid #80848a', borderRadius: 5 }}>
                    <h2>New Student</h2>
                    <TextField fullWidth label="ID" className={classes.textfield} value={id} onChange={handleId}/>
                    <TextField fullWidth label="First Name" className={classes.textfield} value={firstName} onChange={handleFirstName}/>
                    <TextField fullWidth label="Last Name" className={classes.textfield} value={lastName} onChange={handleLastName}/>
                    <TextField fullWidth label="DOB" type="date" className={classes.textfield} value={dob} onChange={handleDob}/>
                    <TextField fullWidth label="Major" className={classes.textfield} value={major} onChange={handleMajor}/>
                    <TextField fullWidth label="GPA" type="number" inputProps={{step: 0.01, min: 0.00, max: 4.00}} className={classes.textfield} value={gpa} onChange={handleGpa}/>
                    <TextField fullWidth label="Email Address" className={classes.textfield} value={email} onChange={handleEmail}/>
                    <Grid item xs={1}>
                        <Button className={classes.button} onClick={submit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Fade>
        </Modal>
    )
}

export default NewStudentModal;
