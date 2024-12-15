import React, { useState } from 'react'
import { Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, FormControlLabel, Grid, Paper, Slide, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import API_Services from '../api/apiServices'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [name_error, SetName_error] = useState(false)
    const [email_error, SetEmail_error] = useState(false)
    const [mobile_error, setMobile_error] = useState(false)
    const navigate = useNavigate()
    const [password_error, setPassword_error] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessages] = useState("")
    const [Icon, setIcon] = useState(null)

    const validatePassword = (pass) => {
        const minLength = pass.length >= 8;
        const hasUppercase = /[A-Z]/.test(pass);
        const hasLowercase = /[a-z]/.test(pass);
        const hasNumber = /\d/.test(pass);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

        if (minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
            return true;
        }
        return false;
    };



    const handleClose = () => {
        setOpen(false)
        navigate("/")
    }

    const handleSubmit = () => {
        const mobilePattern = /^[0-9]{10}$/;
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };
        if (name === "") {
            SetName_error(true)
            return
        }

        if (!validateEmail(email)) {
            SetEmail_error(true);
            return;
        }
        if (!mobilePattern.test(mobile)) {
            setMobile_error(true)
            return
        }
        if (!validatePassword(password)) {
            setPassword_error("Password must be at least 8 characters, include uppercase, lowercase, number, and a special character.");
            return;
        }
        const data = {
            name: name,
            email: email,
            password: password,
            mobile: mobile
        }
        API_Services.signup(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                setOpen(true)
                setIcon(<CheckCircleIcon fontSize="large" color="success" />)
                setMessages(res.message)
            }
        }).catch((err) => {
            console.log("errmessage", err)
            setOpen(true)
            setIcon(<CancelIcon fontSize='large' color='danger' />)
            setMessages(err.response.data.message)
        })
    }

    return (
        <div>
            <Grid>
                <Paper elevation={10} style={{ width: 320, margin: "20px auto", padding: "20px 30px" }}>
                    <Grid align="center">
                        <Avatar>S</Avatar>
                        <Typography>Signup</Typography>
                        <Typography variant='caption'>Please fill the form to create an account</Typography>
                    </Grid>

                    <TextField
                        style={{ margin: "8px 0px" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1' variant='standard'
                        label="Name"
                        error={name_error}

                        helperText={name_error ? "name Rquired" : ""}
                        placeholder='Enter Name'
                        required
                        fullWidth

                    />

                    <TextField style={{ margin: "8px 0px" }} value={email} error={email_error} helperText={email_error ? "Invalid email format" : ""} onChange={(e) => setEmail(e.target.value)} variant='standard' label="Email" placeholder='Enter Email' required fullWidth />

                    <TextField type='number' error={mobile_error} helperText={mobile_error ? "Enter a valid 10-digit mobile numbe" : ""} style={{ margin: "8px 0px" }} value={mobile} onChange={(e) => setMobile(e.target.value)} variant='standard' label="Mobile" placeholder='Enter Mobile Number' required fullWidth />

                    <TextField style={{ margin: "8px 0px" }} value={password} onChange={(e) => setPassword(e.target.value)} variant='standard' type='password' error={password_error !== ""}
                        helperText={password_error} label="password" placeholder='Enter password' required fullWidth />

                    <FormControlLabel style={{ margin: "8px 0px" }}
                        control={<Checkbox />}
                        label="i accept terms and conditions"
                    />
                    <Button onClick={handleSubmit} style={{ margin: "8px 0px" }} variant="contained" fullWidth>Signup</Button>

                    <Dialog
                        maxWidth="xs"
                        fullWidth
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >

                        <DialogContent>
                            <DialogContentText className='text-center' fontSize={20} id="alert-dialog-description">
                                {Icon}
                                <Typography variant='h6'>{message}</Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className='d-flex justify-content-center'>
                            <Button variant="contained" size="large" onClick={handleClose} autoFocus>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Typography style={{ margin: "8px 0px" }}>
                        Already have an account? <Link to="/">Login</Link>
                    </Typography>

                </Paper>
            </Grid>
        </div>
    )
}

export default Signup