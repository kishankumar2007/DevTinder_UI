import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
        "& .MuiOutlinedInput-root": {
            borderRadius: "5px",
            borderColor: "#212121",
            "& fieldset": {
                borderColor: "#00c6ff"
            },
            "&:hover fieldset": {
                borderColor: "#00c5aa"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#00c6ff",
                borderWidth: "2px"
            },
            "& label.Mui-focused": {
                color: "#00c6ff"
            }
        },
        "& label": {
            color: "#f9f9f9"
        },
        "& label.Mui-focused": {
            color: "#00c6ff"
        },
        "& .MuiInputBase-input":{
            color:"#f9f9f9"
        }
    }))