import React from "react";
import { Button, Menu, MenuItem, Typography} from "@mui/material";
import "../css/style.css";
import ArchievePage from "../pages/archieve/archievePage";
import Edit from "../pages/archieve/edit";
import Fired from "../pages/archieve/firedPeople";

const Store = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clicked, setClicked] = React.useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setClicked(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setClicked(false);
    };

    const handleMenuItemClick = (content) => {
        setSelectedMenuItem(content);
        handleClose(true);
    };

    return(
        <div>
            <Button onClick={handleClick} sx={{
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

            }}>
                <Typography>Архів</Typography>
                 </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={() => handleMenuItemClick("Перегляд картки в архіві")}>Перегляд картки в архіві</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Список звільнених вікладачів за вказаний період")}>Список звільнених вікладачів за вказаний період</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Перегляд і редагування номерів і дат наказів на зарахування і звільнення")}>Перегляд і редагування номерів і дат наказів на зарахування і звільнення</MenuItem>
            </Menu>
            {selectedMenuItem && (
                <div>
                    <h2>Було обрано: {selectedMenuItem}</h2>
                    {selectedMenuItem === "Перегляд картки в архіві" && <ArchievePage/> }
                    {selectedMenuItem === "Список звільнених вікладачів за вказаний період" && <Edit />}
                    {selectedMenuItem === "Перегляд і редагування номерів і дат наказів на зарахування і звільнення" && <Fired />}
                </div>
            )}
        </div>
    )
};

export default Store;