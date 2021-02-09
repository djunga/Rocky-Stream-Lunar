import React, {useState} from 'react';
import { Backdrop, Button, Fade, Grid, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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

export default function ViewStudentModal(props) {
    const history = useHistory();
    const classes = useStyles();

    const { open, setOpen } = props;

    const [id, setId] = useState("101234567");

    const handleId = (e) => setId(e.target.value);

    const closeModal = () => { setOpen(false); }

    const submit = () => {
        Axios.post("http://localhost:3001/viewstudent", {
            id: id,
            
        }).then((result) => {
            if(result.data == "DNE") {
                console.log("There is no student with this ID.");
            }
            else {
                console.log(result.data.result);
                history.push({
                    pathname: `/viewstudent/${id}`,
                    state: result.data.result
                });
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
                    <h2>View Student</h2>
                    <TextField fullWidth label="ID" className={classes.textfield} value={id} onChange={handleId}/>
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
