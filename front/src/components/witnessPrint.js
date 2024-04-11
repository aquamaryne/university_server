import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

// Стили для кнопки
const buttonStyles = (clicked) => ({
    border: 2,
    fontFamily: 'Daikon',
    fontWeight: 'bold',
    borderRadius: 0,
    color: clicked ? "white" : "black",
    backgroundColor: clicked ? '#191970' : 'transparent',
    '&:hover': {
        backgroundColor: clicked ? '#191970' : '#191970',
        color: clicked ? 'white' : 'white',
        borderColor: 'orange',
        boxShadow: '-4px 2px 2px 0 purple',
    },
    transition: 'box-shadow 0.3s'
});

// Массив элементов меню
const menuItems = [
    "Друк довідника факультетів",
    "Друк довідника посад",
    "Друк довідника підрозділів",
    "Друк довідника причин звільнення",
    "Друк довідника родинного стану",
    "Друк довідника членів сім'ї",
    "Друк довідника трудових угод",
    "Друк довідника видів відпусток",
    "Друк довідника вчених званнів",
    "Друк довідника вчених ступенів",
    "Друк довідника іноземних мов",
    "Друк довідника наукових галузей",
    "Друк довідника почесних званнів"
];

const PrintWitness = () => { 
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

    return(
        <div>
            <Button onClick={handleClick} sx={buttonStyles(clicked)}>
                <Typography>
                    Друк довідників
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};


export default PrintWitness;
