import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  List,
  CircularProgress,
} from '@mui/material';
import SmallCard from './SmallCard';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { Home, Logout } from '@mui/icons-material';
import ExploreIcon from '@mui/icons-material/Explore';
import { addConnection, connectionRequest } from '../store/connectionSlice';
import BASE_URL from '../constant';


export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Connections');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const connectionRequests = useSelector(state => state.connection.connectionRequests);
  const myConnections = useSelector(state => state.connection.myConnection);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  const getRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      setValue("Requests");
      const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true });
      dispatch(connectionRequest(res.data));
    } catch (error) {
      setError("Failed to load requests. Please try again.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getConnections = async () => {
    try {
      setLoading(true);
      setError(null);
      setValue("Connections");
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnection(res.data));
    } catch (error) {
      setError("Failed to load connections. Please try again.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (open) {
      getConnections();
    }
  }, [open]);

  const DrawerList = (
    <Box sx={{ width: 250, color:"#f9f9f9",bgcolor:"#1e1e1e",minHeight:"100vh" }} role="presentation" >
      <List sx={{ width: '100%', maxWidth: 300 }} aria-label="contacts">

        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"} >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><Home sx={{color:"gray"}} /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>


        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/profile"} >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><AccountCircleIcon sx={{color:"gray"}} /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link>


        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/feed"} >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><ExploreIcon sx={{color:"gray"}} /></ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/feed"} >
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon><Logout sx={{color:"red"}} /></ListItemIcon>
              <ListItemText sx={{color:"red"}} primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>


      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleToggleChange}
        aria-label="Platform"
      >
        <ToggleButton onClick={getConnections} sx={{ width: "120px", ml:1,color:"gray"}} value="Connections">Connections</ToggleButton>
        <ToggleButton onClick={getRequests} sx={{ width: "120px",color:"gray"}} value="Requests">Requests</ToggleButton>
      </ToggleButtonGroup>


      <Box sx={{ mt: 2 , bgcolor:"#1e1e1e"}}>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: '#1e1e1e',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 400,
              '& ul': { padding: 0 },
            }}
          >
            {value === "Requests" && (
              connectionRequests.length > 0 ? connectionRequests.map((user, idx) => (
                <SmallCard key={idx} type="Requests" user={user} />
              )) : <Typography display="flex" justifyContent="center" textAlign="center" mt={5} gap={2} variant='h6' alignItems="center"> No Request Yet <GroupIcon sx={{ opacity: "50%" }} /></Typography>
            )}

            {value === "Connections" && (
              myConnections.length > 0 ? myConnections.map((user, idx) => (
                <SmallCard key={idx} type="Connections" user={user} />
              )) : <Typography display="flex" justifyContent="center" textAlign="center" mt={5} gap={2} variant='h6' alignItems="center">No Connection Yet <GroupIcon sx={{ opacity: "50%" }} /></Typography>
            )}
          </List>
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <Button variant='' >
        <MenuIcon onClick={toggleDrawer(true)} sx={{ display: { sm: "none", xs: "block" } }} />
      </Button>
      <Drawer bgcolor="#1e1e1e" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
