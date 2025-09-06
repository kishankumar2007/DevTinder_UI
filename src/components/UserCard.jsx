import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import BASE_URL from "../constant"
import { toast } from 'react-toastify'
import {removeUserFromFeed} from "../store/userSlice"
import { useDispatch } from 'react-redux'
const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const acceptRequest = async () => {
    try {
      const res = await axios.post(BASE_URL + `/request/send/interested/${user?._id}`, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(user._id))
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
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  const rejectRequest = async () => {
    try {
      const res = await axios.post(BASE_URL + `/request/send/ignore/${user?._id}`, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(user._id))
      toast.error(res.data?.message, {
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
      })
    } catch (error) {

    }

  }
  return (
    <Card sx={{ maxWidth: 350, width: 300, maxHeight: 450 }}>
      <CardMedia
        component="img"
        alt="Profile Image"
        height="300"
        image={user?.avatar}
      />

      <CardContent sx={{ p: 0, px: 2 }} >
        <Typography variant="h6">
          {user?.firstName + " " + user?.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary',textTransform:"capitalize" }}>
          {user?.age && user?.gender} {user?.age && `| ${user?.age}`}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', py: 0 }}>
          {user?.about}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button sx={{ textTransform: "capitalize" }} onClick={acceptRequest} variant='contained' color='success' size="medium">Send</Button>
        <Button sx={{ textTransform: "capitalize" }} onClick={rejectRequest} variant='contained' color="error" size="medium">Ignore</Button>
      </CardActions>
    </Card>
  )
}

export default UserCard
