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
    findButton: {
        width: 100,
        backgroundColor: 'blue',
        margin: 6,
    },
}));

export default function UpdateStudentModal(props) {
    const classes = useStyles();

    const { open, setOpen } = props;

    const [id, setId] = useState("110578082");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [major, setMajor] = useState('');
    const [gpa, setGpa] = useState(0.00);
    const [email, setEmail] = useState('');

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

    const findStudent = () => {
        Axios.post("http://localhost:3001/findstudent", {
            id: id,
            
        }).then((result) => {
            if(result.data == "DNE") {
                console.log("There is no student with this ID.");
            }
            else {
                console.log(result);
                const student = result.data.result[0];
                setFirstName(student.firstName);
                setLastName(student.lastName);
                setDob(student.dob.substring(0,student.dob.length-14));
                setMajor(student.major);
                setGpa(student.gpa);
                setEmail(student.email);
            }
        });
    }

    const submit = () => {
        Axios.post("http://localhost:3001/updatestudent", {
            id: id,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            major: major,
            gpa: gpa,
            email: email,
            
        }).then((result) => {
            if(result.data == "UPDATE_ERROR") {
                console.log("The student was not updated.");
            }
            else {
                console.log("Student with id " + id + " successfully updated.");
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
                    <h2>Update Student</h2>
                    <TextField fullWidth label="ID" className={classes.textfield} value={id} onChange={handleId}/>
                    <Button className={classes.findButton} onClick={findStudent}>Find student </Button>
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