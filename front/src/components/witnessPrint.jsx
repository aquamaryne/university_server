import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

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
        <React.Fragment>
            <Button onClick={handleClick} sx={{ border: 1 }}>
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
        </React.Fragment>
    );
};


export default PrintWitness;
