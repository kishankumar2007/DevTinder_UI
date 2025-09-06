import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';
import axios from "axios"
import BASE_URL from "../constant"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OtpBox } from './OtpBox';

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const registerUser = async () => {
        try {
            if ([firstName, lastName, email, password].some(field => field.trim() === "")) {
                setError("All the input fields are required.")
                return
            }
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, email, password }, { withCredentials: true })
            toast.success(res.data?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {
                    width: 170
                }
            });
            console.log(res?.data?.data)
            if (res.data.data) {
                navigate("/login")
            }
        } catch (error) {
            setError(error?.response?.data?.message)
            console.log(error.message)
        }
    }
    return (

        <Box flex={5} alignContent={"center"} mt={8} >
            <Box p={1} borderRadius={5} sx={{ width: { xs: 270, sm: 400 } }} mx="auto">
                <Typography mt={2} variant='h4' textAlign={"center"}>
                    Sign up</Typography>
                <Stack mt={5} display="flex" alignItems={"center"} flexDirection="column" gap={2} required>

                    <Box display={"flex"} gap={1}>
                        <TextField value={firstName} onChange={e => setFirstName(e.target.value)} id="firstName" label="First Name" variant="outlined" required />
                        <TextField value={lastName} onChange={e => setLastName(e.target.value)} id="lastName" label="Last Name" variant="outlined" required />
                    </Box>

                    {/* <Box width={"100%"} display={"flex"} gap={1}> */}
                    <TextField value={email} onChange={e => setEmail(e.target.value)} fullWidth id="email" label="Email" variant="outlined" required />
                    {/* {email && <OtpBox email={email} />}
                    </Box> */}


                    <TextField value={password} onChange={e => setPassword(e.target.value)} fullWidth id="password" label="Password" type='password' variant="outlined" required />
                    {error && <Typography variant='body2' color='error'>{error}</Typography>}
                    <Button onClick={registerUser} type='submit' fullWidth size='large' variant='contained'>Create Account</Button>
                    <Typography variant='body2' component="p">Already have an account? <Link style={{textDecoration:"none"}} to='/login'>Login</Link></Typography>
                </Stack>
            </Box>
        </Box>
    )
}

export default Signup
