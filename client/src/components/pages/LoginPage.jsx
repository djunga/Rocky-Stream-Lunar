import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid, Modal, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import lunarLogo from '../../images/lunar_logo.png';

const useStyles = makeStyles((theme) => ({
    parentPaper: {
        margin: '20%',
        padding: '5%',
        justifyContent: 'center',
        backgroundColor: '#ffad54',
        height: '100vh'
    },
    loginButton: {
        background: 'linear-gradient(45deg, #3e8a3a 30%, #74e66e 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
        color: 'white',
        fontSize: '12px',
        height: 30,
        width: '85%',
    },
    adminButton: {
        background: 'red',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .5)',
        color: 'white',
        fontSize: '12px',
        height: 30,
        width: '85%',
    },
}));

function LoginPage(props) {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useState({
        email: "",
        id: 0,
        isLoggedIn: false,
    });

    const [adminLogin, setAdminLogin] = useState(true);
    const [email, setEmail] = useState('brian.maynard@it.rockystream.edu');
    const [password, setPassword] = useState('100');

    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const switchToAdmin = () => {
        setAdminLogin(true);
    }

    const switchToStudent = () => {
        setAdminLogin(false);
    }
    const submit = () => {
        if(adminLogin) {
            Axios.post("http://localhost:3001/verifyLogin", {
                email: email,
                password: password,
                isAdmin: true,
            }).then((info) => {
                const data = info.data;
                if(data.isLoggedIn) {
                    //setUser(data);
                    history.push({
                        pathname: `/dashboard`,
                        state: { user: data }
                    });
                }
                else {
                    console.log("Login incorrect.");
                }
            });
        }
        else {
            console.log("A student is logging in.");
        }
    }

    return(
        <Box
        
            style={{
                padding: '5%',
            }}
        
        >
            <img src={lunarLogo} />
            <Paper
                elevation={10}
                style={{
                    padding: '1%',
                    marginLeft: '40%',
                    width: '20%',
                    justifyContent: 'center',
                    backgroundColor: '#7b95bd',
                }}
            >
                <h2>{adminLogin ? 'Admin login' : 'Student login'}</h2>
                <Grid container direction="column" alignContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            onChange={handleEmail}
                            value={email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            onChange={handlePassword}
                            value={password}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            className={classes.loginButton}
                            onClick={submit}
                        >
                            submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            className={classes.adminButton}
                            onClick={adminLogin ? switchToStudent : switchToAdmin}
                        >
                            {adminLogin ? 'student login' : 'admin login'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default LoginPage;
