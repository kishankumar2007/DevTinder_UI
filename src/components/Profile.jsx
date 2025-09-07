import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BASE_URL from '../constant';
import { toast } from 'react-toastify';
import { login } from "../store/authSlice"
import { StyledTextField } from './StyledTextField';
const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [fileId, setFileId] = useState('')

  const user = useSelector(state => state.auth.userData)
  const dispatch = useDispatch();
  const userDetails = { firstName, lastName, gender, about, avatar }
  useEffect(() => {
    setFirstName(user?.firstName || '')
    setLastName(user?.lastName || '')
    setEmail(user?.email || '')
    setGender(user?.gender || '')
    setAbout(user?.about || '')
    setAvatar(user?.avatar || "")
    setFileId(user?.public_Id)
  }, [])

  const updateProfile = async () => {
    try {
      setLoading(true)
      const res = await axios.patch(BASE_URL + '/profile/edit', userDetails, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true })
      console.log(res.data.user)
      dispatch(login(res.data.user))
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
      });
    } catch (error) {
      toast.error(error.message, {
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
      console.log(error.message)
    } finally { setLoading(false) }
  }

  return (

    <Box p={2} maxWidth={400} mx="auto">
      <Typography mt={2} variant="h4" textAlign="center"><span style={{ color: "transparent", background: "linear-gradient(90deg,#00c6ff,#00c5aa)", overflow: "hidden", backgroundClip: "text" }}>Edit Profile</span></Typography>

      <Stack mt={5} alignItems="center" gap={2}>

        <Box display="flex" gap={1} width="100%">
          <StyledTextField value={firstName} onChange={e => setFirstName(e.target.value)} id="first-name" label="First Name" variant="outlined" required fullWidth />
          <StyledTextField value={lastName} onChange={e => setLastName(e.target.value)} id="last-name" label="Last Name" variant="outlined" required fullWidth />
        </Box>

        <StyledTextField value={email} id="email" label="Email" variant="outlined" disabled fullWidth />

        <StyledTextField value={about} onChange={e => setAbout(e.target.value)} id="about" label="About" variant="outlined" required fullWidth />

        <Box display="flex" gap={2} width="100%">
          <FormControl fullWidth size="small">
            <TextField select
            label="Choose Gender"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#00c6ff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00c5aa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00c6ff",
                    borderWidth: "2px",
                  },
                },
                "& .MuiSelect-select": {
                  color: "#f9f9f9",
                },
                "& label":{
                  color:"#f9f9f9"
                },
                "& label.Mui-focused ":{
                  color: "#00c6ff"
                }
              }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </FormControl>

          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{
            borderRadius: "12px", textTransform: "none", fontWeight: "bold", px: 3, py: 1.5, boxShadow: 2, "&:hover": {
              boxShadow: 4,
            },
          }}
          >
            Upload Avatar
            <input type="file" hidden onChange={(e) => setAvatar(e.target.files[0])}
            />
          </Button>
        </Box>

        <Button sx={{ background: "linear-gradient(90deg,#00c6ff,#00c5aa)" }} onClick={updateProfile} fullWidth size="large" variant="contained">{loading ? <CircularProgress color='inherit' /> : "Update"}</Button>
      </Stack>
    </Box>

  )
}

export default Profile

