import { Home, } from '@mui/icons-material';
import ExploreIcon from '@mui/icons-material/Explore';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from "../constant"
import { useState } from 'react';
import SmallCard from './SmallCard';
import { addConnection } from "../store/connectionSlice"
import { connectionRequest } from "../store/connectionSlice"
import { useDispatch, useSelector } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Sidebar = () => {
  const [value, setValue] = useState('Connections')
  const dispatch = useDispatch()
  const connectionRequests = useSelector(state => state.connection.connectionRequests)
  const myConnections = useSelector(state => state.connection.myConnection)

  const getRequests = async () => {
    try {
      setValue("Requests")
      const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true })
      dispatch(connectionRequest(res.data))
    } catch (error) {
      console.log(error.message)
    }
  }
  const getConnections = async () => {
    try {
      setValue("Connections")
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
      dispatch(addConnection(res.data))
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Box alignItems="center" sx={{ display: { xs: "none", sm: "block", borderRight: "2px solid #242424", maxWidth: 300 } }} p={2} flex="1">
      <List
        sx={{ width: '100%', maxWidth: 300, color: "#f9f9f9" }}
        aria-label="contacts"
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"} >
          <ListItem sx={{ "&:hover": { bgcolor: "#242424", borderRadius: 2 } }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home sx={{ color: "gray" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/profile"} >
          <ListItem sx={{ "&:hover": { bgcolor: "#242424", borderRadius: 2 } }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "gray" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/feed"} >
          <ListItem sx={{ "&:hover": { bgcolor: "#242424", borderRadius: 2 } }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ExploreIcon sx={{ color: "gray" }} />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/premium"} >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><CheckCircleOutlineIcon sx={{ color: "goldenrod" }} /></ListItemIcon>
              <ListItemText sx={{ color: "goldenrod" }} primary="Premium" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={''}
        aria-label="Platform"
      >
        <ToggleButton onClick={getConnections} sx={{ width: "130px", color: "#f9f9f9" }} value="Connections">Connections</ToggleButton>
        <ToggleButton onClick={getRequests} sx={{ width: "130px", color: "#f9f9f9" }} value="Requests">Requests</ToggleButton>
      </ToggleButtonGroup>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          color: "#f9f9f9",
          position: 'relative',
          overflow: 'auto',
          maxHeight: 400,
          '& ul': { padding: 0 },
        }}
      >
        {value === "Requests" && (connectionRequests.length > 0 ? connectionRequests.map((user, idx) => (
          <SmallCard key={idx} type={"Requests"} user={user} />
        )) : <Typography display={"flex"} justifyContent={"center"} textAlign={"center"} mt={5} gap={2} variant='h6' alignItems={"center"}> No Request Yet <GroupIcon sx={{ opacity: "50%" }} /></Typography>)}

        {value === "Connections" && (myConnections.length > 0 ? myConnections.map((user, idx) => (
          <SmallCard key={idx} type={"Connections"} user={user} />
        )) : <Typography display={"flex"} justifyContent={"center"} textAlign={"center"} mt={5} gap={2} variant='h6' alignItems={"center"}>No Connetion Yet <GroupIcon sx={{ opacity: "50%" }} /></Typography>)}
      </List>
    </Box>
  )
}

export default Sidebar
