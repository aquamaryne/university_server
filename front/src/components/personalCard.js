import React from "react";
import { MenuItem, Menu, Button } from "@mui/material"

const PersonalCard = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick} sx={{
                border: 1,
                borderRadius: 1,
                color: "black",
                '&:hover': {
                    background: 'black',
                    color: 'white'
                },
            }}>Особисті картки</Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={handleClose}>Внесення особистих карток</MenuItem>
                <MenuItem onClick={handleClose}>Пошук по прізвищу</MenuItem>
            </Menu>
        </div>
    )
}

export default PersonalCard;