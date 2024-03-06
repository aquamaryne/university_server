import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Store = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clicked, setClicked] = React.useState(false);

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
            <Button onClick={handleClick} sx={{
                border: 2,
                fontFamily: 'PT Sans',
                borderRadius: 1,
                color: clicked ? "white" : "black",
                backgroundColor: clicked ? '#191970' : 'transparent',
                '&:hover': {
                    backgroundColor: clicked ? '#191970' : '#191970',
                    color: clicked ? 'white' : 'white',
                    borderColor: 'orange',
                    boxShadow: '-4px 4px 2px 0 purple',
                },
            }}>Архів </Button>
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