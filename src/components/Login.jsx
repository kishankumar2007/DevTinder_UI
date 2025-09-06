import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import BASE_URL from '../constant'
import { login } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = async () => {
        setError('')
        if ([email, password].some(field => field.trim() === "")) {
            setError("all input fields are required.")
            return
        }
        setEmail('')
        setPassword('')
        try {
            setLoading(true)
            const res = await axios.post(BASE_URL + "/login", { email, password }, { withCredentials: true })
            if (res?.data?.user) {
                dispatch(login(res.data.user))
                toast.success(res.data?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style:{
                        width:170
                    }
                });
                navigate("/")

            }
        } catch (error) {
            setError(error.response.data.message)
        }finally{
            setLoading(false)
        }

    }
    return (
        <Box flex={5} alignContent={"center"} mt={12} >

            <Typography variant='h4' textAlign={"center"}>
                Login
            </Typography>
            <Stack maxWidth={400} p={2} mx="auto" display="flex" alignItems={"center"} flexDirection="column" gap={2} required>
                <TextField value={email} onChange={e => setEmail(e.target.value)} fullWidth id="email" label="Email" variant="outlined" required />
                <TextField value={password} onChange={e => setPassword(e.target.value)} fullWidth id="password" label="Password" type='password' variant="outlined" required />
                {error && <Typography variant='p' fontSize={"xs"} color='red'>{error}</Typography>}
                <Button onClick={handleClick} fullWidth variant='contained'>{loading?"Logging in...": "Login"}</Button>
                <Typography variant='body2' component="p">Don't have an account? <Typography sx={{ textDecoration: "none", color: "blueviolet" }} href='/signup' component="a">Register</Typography></Typography>
            </Stack>
        </Box>
    )
}

export default Login
