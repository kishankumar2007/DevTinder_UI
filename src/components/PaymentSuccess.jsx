import React from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const PaymentSuccess = () => {
    const navigate = useNavigate()
    setTimeout(() => navigate("/premium"), 3000)
    return (
        <Typography fontSize={30}  varient="h1" sx={{ mt: 5 , color: "green", textAlign:"center", width:"100%" }}>
            <WorkspacePremiumIcon sx={{fontSize:30}} /> Payment Successful
        </Typography>
    )
}

export default PaymentSuccess
