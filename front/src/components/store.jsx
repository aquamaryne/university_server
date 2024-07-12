import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import "../css/style.css";
import ArchievePage from "../pages/archieve/archievePage";
import Edit from "../pages/archieve/edit";
import Fired from "../pages/archieve/firedPeople";

// Массив элементов меню
const menuItems = [
    "Перегляд картки в архіві",
    "Список звільнених вікладачів за вказаний період",
    "Перегляд і редагування номерів і дат наказів на зарахування і звільнення"
];

// Функция для рендеринга выбранного содержимого
const renderSelectedContent = (selectedMenuItem) => {
    switch (selectedMenuItem) {
        case "Перегляд картки в архіві":
            return <ArchievePage />;
        case "Список звільнених вікладачів за вказаний період":
            return <Edit />;
        case "Перегляд і редагування номерів і дат наказів на зарахування і звільнення":
            return <Fired />;
        default:
            return null;
    }
};

const Store = () => { 
    const [anchorEl, setAnchorEl] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

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
        <React.Fragment>
            <Button onClick={handleClick} sx={{ border: 1 }}>
                <Typography>Архів</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
            {selectedMenuItem && (
                <React.Fragment>
                    {renderSelectedContent(selectedMenuItem)}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};


export default Store;
