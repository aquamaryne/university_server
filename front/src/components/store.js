import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Store = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick}>Довідники </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={handleClose}>Перегляд картки в архіві</MenuItem>
                <MenuItem onClick={handleClose}>Список звільнених вікладачів за вказаний період</MenuItem>
                <MenuItem onClick={handleClose}>Перегляд і редагування номерів і дат наказів на зарахування і звільнення</MenuItem>
            </Menu>
        </div>
    )
};

export default Store;