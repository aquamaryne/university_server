import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

// Массив элементов меню
const menuItems = [
    "Довідник факультетів",
    "Довідник посад",
    "Довідник підрозділів",
    "Довідник причин звільнення",
    "Довідник родинного стану",
    "Довідник членів сім'ї",
    "Довідник трудових угод",
    "Довідник видів відпусток",
    "Довідник вчених званнів",
    "Довідник вчених ступенів",
    "Довідник іноземних мов",
    "Довідник наукових галузей",
    "Довідник почесних званнів"
];

const Witness = () => { 
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
                    Довідники
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


export default Witness;
