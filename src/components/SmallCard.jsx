import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import BASE_URL from '../constant'
import { addConnection, removeConnection } from '../store/connectionSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


const SmallCard = ({ user, type }) => {
  const dispatch = useDispatch()


  const fullName = `${user?.firstName + " " + user?.lastName}`
  const about = user?.about
  const avatar = user?.avatar

  const acceptRequest = async () => {
    try {
      console.log(user)
      const res = await axios.post(BASE_URL + `/request/review/accepted/${user?._id}`, {}, { withCredentials: true })
     console.log(res.data.data)
      dispatch(addConnection([user]))
      dispatch(removeConnection(user?._id))
      toast.success(res?.data?.message, {
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
      const res = await axios.post(BASE_URL + `/request/review/rejected/${user?._id}`, {}, { withCredentials: true })
      dispatch(removeConnection(user?._id))
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
      console.log(error.message)
    }
  }
  return (
    <Box sx={{ mt: 1}}>
      <Stack sx={{ boxShadow: 2, bgcolor: '#242424', py: 1, borderRadius: 2 }} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={2} flexDirection={"row"} width={"100%"}>
        <Avatar src={avatar} alt='profile_pic' />

        <Box >
          <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", maxWidth: 170, textOverflow: "ellipsis" }} variant='h6'>{fullName}</Typography>
          <Typography variant='h6' sx={{ fontSize: "13px", whiteSpace: "nowrap", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}>{about}</Typography>
          {type === "Requests" &&
            <>
              <Button onClick={acceptRequest} sx={{ textTransform: "capitalize", marginRight: 1 }} variant='contained' color='success' size="small">Accept</Button>
              <Button onClick={rejectRequest} sx={{ textTransform: "capitalize" }} variant='contained' color="error" size="small">Reject</Button>
            </>
          }
        </Box>
      </Stack>
    </Box>
  )
}

export default SmallCard
