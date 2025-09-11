import { Box, Button, Card, Chip, Divider, Stack, Typography } from '@mui/material'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import axios from 'axios';
import BASE_URL from "../constant.js"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice.js';
import PaymentSuccess from './PaymentSuccess.jsx';
import { useNavigate } from 'react-router-dom';

const Premium = () => {
    const [proFeature, setProFeature] = useState([
        "Unlimited Messaging",
        "Profile Boosts",
        "Advanced Search Filters",
        "Rewind Last Action",
        "Ad-Free Experience"
    ])
    const [superFeature, setSuperFeature] = useState([
        "Send Message Without Match (DM First)",
        "Priority Placement (Skip the Line)",
        "Exclusive Super Badge",
        "Incognito Mode / Privacy Mode",
        "Access to Exclusive Events & Live Matching"
    ])
    const userData = useSelector(state => state.auth.userData)
    const dispath = useDispatch()
    const navigate = useNavigate()

    const verifyPayment = async (response) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response
            const { data: { paymentInfo, user } } = await axios.post(BASE_URL + "/verify-payment", { razorpay_order_id, razorpay_payment_id, razorpay_signature }, { withCredentials: true })
            console.log(paymentInfo, user)
            if (user) {
                dispath(login(user))
                navigate("/payment-success")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleBuyButton = async (type) => {
        try {
            const order = await axios.post(BASE_URL + "/payment/create", { memberShipType: type }, { withCredentials: true })
            console.log(order)
            const { amount, currency, fullName, email, orderId, memberShipType } = order.data.response
            const options = {
                "key": order.data.key_id,
                amount,
                currency,
                order_id: orderId,
                "name": "Dev Tinder",
                "description": `Buy ${memberShipType} plan`,
                "image": "https://ibb.co/KxC95cKb",
                "prefill": {
                    "name": fullName,
                    email,
                    "contact": "+919876543210"
                },
                "notes": {
                    "address": "Jagatpura, Rajasthan,302017"
                },
                "theme": {
                    "color": "#00c6ff"
                },
                handler: verifyPayment
            }
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        userData.isPremium ? <Typography fontWeight={"bold"} sx={{ textAlign: "center", mt: 3 }} variant='h6' color='#f9f9f9'>You are already Premium</Typography> : <Stack
            direction="row"
            gap={3}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ py: 4 }}
        >
            {/* Pro Plan */}
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 280,
                    bgcolor: "#1e1e1e",
                    border: "1.5px solid #353535",
                    color: "#f9f9f9",
                    borderRadius: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-6px)" }
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <WorkspacePremiumIcon sx={{ color: "goldenrod", fontSize: 30 }} />
                        <Typography fontWeight="bold" fontSize="22px">
                            Pro
                        </Typography>
                        <Typography fontWeight="bold">
                            <span
                                style={{
                                    color: "transparent",
                                    background: "linear-gradient(90deg,#ffd700,#daa520)",
                                    WebkitBackgroundClip: "text"
                                }}
                            >
                                ₹99/-
                            </span>
                        </Typography>
                    </Stack>

                    <Stack sx={{ mt: 2 }}>
                        {proFeature.map((feature, idx) => (
                            <Stack key={idx} direction="row" gap={1.5} alignItems="center" my={1}>
                                <CheckCircleOutlineIcon sx={{ color: "goldenrod" }} />
                                <Typography variant="body2" sx={{ color: "#eaeaea", letterSpacing: 0.5 }}>
                                    {feature}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                <Divider />
                <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={() => handleBuyButton("pro")}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(90deg,#DAA520,#FFD700)",
                            color: "#242424",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": { opacity: 0.9 }
                        }}
                    >
                        Get Plan
                    </Button>
                </Box>
            </Card>

            {/* Super Plan */}
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 280,
                    bgcolor: "#1e1e1e",
                    border: "1.5px solid #353535",
                    color: "#f9f9f9",
                    borderRadius: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-6px)" }
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <WorkspacePremiumIcon sx={{ color: "goldenrod", fontSize: 30 }} />
                        <Typography fontWeight="bold" fontSize="22px">
                            Super
                        </Typography>
                        <Typography fontWeight="bold">
                            <span
                                style={{
                                    color: "transparent",
                                    background: "linear-gradient(90deg,#ffd700,#daa520)",
                                    WebkitBackgroundClip: "text"
                                }}
                            >
                                ₹199/-
                            </span>
                        </Typography>
                    </Stack>

                    <Stack sx={{ mt: 2 }}>
                        {superFeature.map((feature, idx) => (
                            <Stack key={idx} direction="row" gap={1.5} alignItems="center" my={1}>
                                <CheckCircleOutlineIcon sx={{ color: "goldenrod" }} />
                                <Typography variant="body2" sx={{ color: "#eaeaea", letterSpacing: 0.5 }}>
                                    {feature}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                <Divider />
                <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={() => handleBuyButton("super")}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(90deg,#DAA520,#FFD700)",
                            color: "#242424",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": { opacity: 0.9 }
                        }}
                    >
                        Get Plan
                    </Button>
                </Box>
            </Card>
        </Stack>

    )
}

export default Premium
