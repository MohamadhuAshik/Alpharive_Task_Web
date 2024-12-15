import React, { useContext, useState } from 'react'
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import API_Services from '../api/apiServices'
import DataContext from '../context/DataContext'

const Login = () => {
    const { setIsLogin } = useContext(DataContext)



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
            console.log(err)
            alert(err.response.data.message)
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

                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} variant='standard' label="Email" placeholder='Enter Email' required fullWidth />

                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} variant='standard' label="password" placeholder='Enter password' required fullWidth />

                    <FormControlLabel
                        control={<Checkbox />}
                        label="Remember Me"
                    />
                    <Button onClick={handleLogin} style={{ margin: "8px 0px" }} variant="contained" fullWidth>Login</Button>
                    <Typography>Forget Password</Typography>
                    <Typography style={{ margin: "8px 0px" }}>
                        crete an account<Link to="/signup"> Signup</Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login