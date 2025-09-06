import { Box, Button, Stack, } from '@mui/material'
import UserCard from './UserCard'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import BASE_URL from "../constant"
import { useEffect, useState } from 'react'
import { setUsers } from "../store/userSlice"

const Feed = () => {
  const [loading, setLoading] = useState(true)
  const feedUsers = useSelector(state => state.users.users)
  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const userData = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
        dispatch(setUsers(userData.data))
      }
      if (authStatus) {
        setLoading(true)
        fetchUsers()
          setLoading(true)
        }
    } catch (error) {
      console.log(error.message)
    } finally { setLoading(false) }
  }, [])

  return (
    <Box flex="5" height={"90vh"} sx={{ overflowY: "scroll" }}>
      {loading ? <Stack mb={30} justifyContent={"center"} mt={30} border={"none"} direction="row" spacing={2}>
        <Button loading loadingPosition="start">
          Loading...
        </Button>
      </Stack> : <Stack display="flex" justifyContent={"center"} flexDirection={"row"} pt={2} gap={2} flexWrap={"wrap"} flexShrink={0}>
        {feedUsers.map((user, index) => <UserCard key={index} user={user} />)}
      </Stack>
      }
    </Box>
  )
}

export default Feed
