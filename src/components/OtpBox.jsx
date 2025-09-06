import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import React, { useState } from "react"
import BASE_URL from "../constant"
import axios from "axios"
import { toast } from "react-toastify"
export const OtpBox = ({ email }) => {
    const [open, setOpen] = useState(false)
    const [userOtp, setUserOtp] = useState('')

    const verifyOtp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/verify-otp", { email, userOtp }, { withCredentials: true })
            if (res.data) {
                setOpen(false)
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
                }

                )
            }
        } catch (error) {
            toast.error(error.response.data?.message, {
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
            }

            )
        }
    }
    const sendOtp = async () => {
        try {
            setOpen(true)
            const res = await axios.post(BASE_URL + "/send-otp", { email }, { withCredentials: true })
            if (res?.data) {
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
                }

                )
            }

        } catch (error) {
            toast.error(error.response.data?.message, {
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
            }

            )
        }
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <React.Fragment>
            <Button sx={{ flexShrink: 0 }} variant="contained" onClick={sendOtp}>
                Send Otp
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter 4 digit otp</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Otp has been sent to your email.
                    </DialogContentText>
                    <TextField
                        onChange={(e) => setUserOtp(e.target.value)}
                        autoFocus
                        required
                        margin="dense"
                        id="otp"
                        name="otp"
                        label="Otp"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={verifyOtp}>
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}