import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import axios from "axios"
import BASE_URL from "../constant"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {StyledTextField} from "./StyledTextField"
// import { OtpBox } from './OtpBox';

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
            <Box p={1} borderRadius={5} sx={{ width: { xs: 300, sm: 400 } }} mx="auto">
                <Typography mt={2} variant='h4' textAlign={"center"}>
                    <span style={{ color: "transparent", background: "linear-gradient(90deg,#00c6ff,#00c5aa)", backgroundClip: "text", overflow: "hidden" }}>Sign up</span>
                </Typography>
                <Stack mt={5} display="flex" alignItems={"center"} flexDirection="column" gap={2} required>

                    <Box display={"flex"} gap={1}>
                        <StyledTextField value={firstName} onChange={e => setFirstName(e.target.value)} id="firstName" label="First Name" variant="outlined" required />
                        <StyledTextField value={lastName} onChange={e => setLastName(e.target.value)} id="lastName" label="Last Name" variant="outlined" required />
                    </Box>

                    {/* <Box width={"100%"} display={"flex"} gap={1}> */}
                    <StyledTextField value={email} onChange={e => setEmail(e.target.value)} fullWidth id="email" label="Email" variant="outlined" required />
                    {/* {email && <OtpBox email={email} />}
                    </Box> */}


                    <StyledTextField value={password} onChange={e => setPassword(e.target.value)} fullWidth id="password" label="Password" type='password' variant="outlined" required />
                    {error && <Typography variant='body2' color='error'>{error}</Typography>}
                    <Button sx={{ textTransform: "none", background: "linear-gradient(90deg,#00c6ff,#00c5aa)" }} onClick={registerUser} type='submit' fullWidth size='large' variant='contained'>Create Account</Button>
                    <Typography sx={{ color: "gray" }} variant='body2' component="p">Already have an account? <Link style={{ textDecoration: "none", color: "#00c6ff" }} to='/login'>Login</Link></Typography>
                </Stack>
            </Box>
        </Box>
    )
}

export { StyledTextField }
export default Signup
