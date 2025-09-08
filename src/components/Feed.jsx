import { Box, Button, CircularProgress, Stack, Typography, } from '@mui/material'
import UserCard from './UserCard'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import BASE_URL from "../constant"
import { useEffect, useState } from 'react'
import GroupIcon from '@mui/icons-material/Group';
import { setUsers } from "../store/userSlice"

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const feedUsers = useSelector(state => state.users.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
        dispatch(setUsers(userData.data));
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [dispatch]);


  return (
    <Box flex="5" height={"90vh"} sx={{ overflowY: "scroll" }}>
      {loading ? <Stack mb={30} justifyContent={"center"} mt={30} border={"none"} direction="row" spacing={2}>
        <Button disabled>
          <CircularProgress size={25} sx={{ color: "#fff", mr: 1 }} />
        </Button>
      </Stack> : (feedUsers.length > 0 ? <Stack display="flex" justifyContent={"center"} flexDirection={"row"} pt={2} gap={2} flexWrap={"wrap"} flexShrink={0}>
        {feedUsers.map((user, index) => <UserCard key={index} user={user} />)}
      </Stack> : <Typography display="flex" justifyContent="center" textAlign="center" mt={5} gap={2} variant='h6' alignItems="center">No user found! <GroupIcon sx={{ opacity: "50%" }} /></Typography>)
      }
    </Box>
  )
}

export default Feed
