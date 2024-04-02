import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import "../css/style.css";
import ArchievePage from "../pages/archieve/archievePage";
import Edit from "../pages/archieve/edit";
import Fired from "../pages/archieve/firedPeople";

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
        <div>
            <Button onClick={handleClick} sx={buttonStyles(clicked)}>
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
                <div>
                    <h2>Було обрано: {selectedMenuItem}</h2>
                    {renderSelectedContent(selectedMenuItem)}
                </div>
            )}
        </div>
    );
};

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

export default Store;
