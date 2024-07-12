import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

// Массив элементов меню
const menuItems = [
    "Внесення особистих карток",
    "Пошук по прізвищу"
];

const PersonalCard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setClicked(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setClicked(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClick} sx={{ border: 1 }}>
                <Typography>Особисті картки</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose}>{item}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
};



export default PersonalCard;
