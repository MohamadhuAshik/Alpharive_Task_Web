import React, { useContext, useState } from 'react'
import { Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, FormControlLabel, Grid, Paper, Slide, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import API_Services from '../api/apiServices'
import DataContext from '../context/DataContext'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const Login = () => {
    const { setIsLogin } = useContext(DataContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(false);
    const [message, setMessages] = useState("")
    const [Icon, setIcon] = useState(null)

    const handleClose = () => {

        setOpen(false)
    }

    const handleLogin = () => {
        const data = {
            email: email,
            password: password
        }
        API_Services.login(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                localStorage.setItem("token", res.token)
                setIsLogin(true)
            }
        }).catch((err) => {
            console.log("err=>", err)
            setOpen(true)
            setIcon(<CancelIcon fontSize='large' color='danger' />)
            setMessages(err.response.data?.message)
        }
        )
    }

    return (
        <div>
            <Grid>
                <Paper elevation={10} style={{ width: 300, margin: "20px auto", padding: "20px 30px" }}>
                    <Grid align="center">
                        <Avatar>L</Avatar>
                        <Typography>Login</Typography>
                    </Grid>

                    <TextField style={{ margin: "8px 0px" }} value={email} onChange={(e) => setEmail(e.target.value)} variant='standard' label="Email" placeholder='Enter Email' required fullWidth />

                    <TextField style={{ margin: "8px 0px" }} value={password} onChange={(e) => setPassword(e.target.value)} variant='standard' label="password" placeholder='Enter password' required fullWidth />

                    <FormControlLabel
                        control={<Checkbox />}
                        label="Remember Me"
                    />
                    <Button onClick={handleLogin} style={{ margin: "8px 0px" }} variant="contained" fullWidth>Login</Button>
                    <Typography>Forget Password</Typography>
                    <Typography style={{ margin: "8px 0px" }}>
                        crete an account<Link to="/signup"> Signup</Link>
                    </Typography>
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

                </Paper>
            </Grid>
        </div>
    )
}

export default Login