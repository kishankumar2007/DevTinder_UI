import React from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const PaymentSuccess = () => {
    const navigate = useNavigate()
    setTimeout(() => navigate("/premium"), 3000)
    return (
        <Typography varient="h6" sx={{ mt: 3, color: "green" }}>
            <WorkspacePremiumIcon /> Payment Successful
        </Typography>
    )
}

export default PaymentSuccess
