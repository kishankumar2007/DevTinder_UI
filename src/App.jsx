import { Box, Stack } from '@mui/material'
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Rightbar from "./components/Rightbar"
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { login } from "./store/authSlice.js"
import BASE_URL from './constant'
import { ToastContainer } from 'react-toastify'
import {addConnection} from "./store/connectionSlice.js"

const App = () => {
  const authStatus = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
      const userConnection = await axios.get(BASE_URL + "/user/connections",{withCredentials:true})
      if(userConnection.data.length > 0){
        dispatch(addConnection(userConnection.data))
      }
      dispatch(login(res.data))
      // if (!res.data) navigate("/login")

    }
    getUserProfile()
  }, [])

  return (
    <Box sx={{bgcolor:"#1e1e1e", minHeight:"100vh"}}>
      <Navbar />
      <Stack width={"100%"} direction="row" justifyContent={"space-between"}>
        {authStatus && <Sidebar />}
        <Outlet />
        {authStatus && <Rightbar />}
      </Stack>
      <ToastContainer>

      </ToastContainer>
    </Box>
  )
}

export default App
