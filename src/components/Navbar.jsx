import styled from '@emotion/styled'
import { AppBar, Avatar, Box, Icon, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';
import { addConnection, connectionRequest } from "../store/connectionSlice"


const Navbar = () => {
  const [open, setOpen] = useState(false)
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
  })
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()

  const handleClick = async () => {
    const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
    toast.success(res?.data, {
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
    });
    dispatch(logout())
    dispatch(addConnection([]))
    dispatch(connectionRequest([]))
    navigate("/login")
  }

  return (
    <Box>
      <AppBar position='sticky' >
        <StyledToolbar  >
          <Typography fontSize="large" sx={{ display: { sm: "block", xs: "none" } }} variant='h6'>DevTinder</Typography>
          <CodeIcon sx={{ display: { sm: "none", xs: "block", } }} />
          <Box display="flex" alignItems="center" gap={2}>
            <Icon><NightsStayIcon /></Icon>
            {userData ? <Avatar onClick={e => setOpen(true)} src={userData?.avatar} />
              : <Avatar onClick={e => setOpen(true)} sx={{ bgcolor: deepOrange[500], height: 30, width: 30 }}> U</Avatar>}
          </Box>
          <Menu
            sx={{ mt: 5 }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}

            onClose={e => setOpen(false)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >

            <MenuItem>
              {authStatus && <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                Profile
              </Link>}
            </MenuItem>
            {authStatus ? <MenuItem onClick={handleClick} > Logout</MenuItem> : <MenuItem><Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              Login
            </Link>
            </MenuItem>
            }

          </Menu>
        </StyledToolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
