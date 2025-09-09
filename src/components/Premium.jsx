import { Box, Button, Card, Chip, Divider, Stack, Typography } from '@mui/material'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';
import axios from 'axios';
import BASE_URL from "../constant.js"

const Premium = () => {
    const [isUserPremium, setIsUserPremium] = useState(false)
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
    const verifyPayment = async () => {
        const response = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true })
        if (response.data.isPremium) {
            setIsUserPremium(true)
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
                Header: verifyPayment
            }
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        isUserPremium ? "user is premium" : <>
            <Card variant="outlined" sx={{ maxWidth: 300, mb: 1, bgcolor: "#212121", border: "2px solid #353535", color: "#f9f9f9", borderRadius: 5 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <WorkspacePremiumIcon sx={{ color: "goldenrod", fontSize: "30px" }} />
                        <Typography fontWeight={"bold"} fontSize={"28px"} gutterBottom variant="h5" component="div">
                            Pro
                        </Typography>
                        <Typography color='goldenrod' fontWeight={"bold"} gutterBottom variant="h5" component="div">
                            <span style={{ color: "transparent", background: "linear-gradient(90deg, #ffd700, #daa520)", backgroundClip: "text", overflow: "hidden" }}> ₹99/- </span>
                        </Typography>
                    </Stack>
                    {proFeature.map((feature, idx) => (
                        <Stack key={idx} flexDirection={"row"} gap={2} my={1}>
                            <CheckCircleOutlineIcon sx={{ color: "goldenrod", }} />
                            <Typography variant="body2" sx={{ color: '#f9f9f9', letterSpacing: 1 }}>
                                {feature}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
                <Divider />
                <Box sx={{ py: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={() => handleBuyButton("pro")} variant='contaiend' sx={{ color: "#242424", background: "linear-gradient(90deg,#DAA520,#FFD700)", textTransform: "capitalize" }}>Get Plan</Button>
                </Box>
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 300, bgcolor: "#212121", border: "2px solid #353535", color: "#f9f9f9", borderRadius: 5 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        display={"flex"}
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <WorkspacePremiumIcon sx={{ color: "goldenrod", fontSize: "30px" }} />
                        <Typography fontWeight={"bold"} fontSize={"28px"} gutterBottom variant="h5" component="div">
                            Super
                        </Typography>
                        <Typography color='goldenrod' fontWeight={"bold"} gutterBottom variant="h5" component="div">
                            <span style={{ color: "transparent", background: "linear-gradient(90deg, #ffd700, #daa520)", backgroundClip: "text", overflow: "hidden" }}> ₹199/- </span>
                        </Typography>
                    </Stack>
                    {superFeature.map((feature, idx) => (
                        <Stack key={idx} flexDirection={"row"} gap={2} my={1}>
                            <CheckCircleOutlineIcon sx={{ color: "goldenrod", }} />
                            <Typography variant="body2" sx={{ color: '#f9f9f9', letterSpacing: 1, m: 0 }}>
                                {feature}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
                <Divider />
                <Box sx={{ py: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button onClick={() => handleBuyButton("super")} variant='contaiend' sx={{ color: "#242424", background: "linear-gradient(90deg,#DAA520,#FFD700)", textTransform: "capitalize" }}>Get Plan</Button>
                </Box>
            </Card>

        </>
    )
}

export default Premium
