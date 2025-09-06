import { Box } from '@mui/material'
import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children, authentication = true }) => {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
        if (authentication && !authStatus) {
                setTimeout(() => {
                    navigate("/login")
                },300)
        }
        if (!authentication && authStatus) {
            navigate("/")
        }
    }, [authentication, navigate, authStatus])
    return (
        <Box sx={{ margin: "auto" }} flex={5} >
            {children}
        </Box>
    )
}

export default AuthLayout
