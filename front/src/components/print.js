import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const Print = () => {
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
        <div>
            <Button onClick={handleClick} sx={buttonStyles(clicked)}>
                <Typography>Друк</Typography>
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
    "Друк особової картки",
    "Друк списку співробітників по підрозділам",
    "Друк списку ювілярів у поточному році",
    "Друк списку співробітників пенсійного віку",
    "Друк списку співробітників передпенсійного віку",
    "Друк списку сумісників",
    "Друк списку чорнобильців",
    "Друк списку інвалідів 2-3 груп",
    "Друк списку працівників, що працюють неповний робочий день",
    "Друк списку викладачів, що працюють на погодинній оплаті",
    "Друк справки з місця роботи",
    "Друк форми №6 - чисельність окремих категорій працівників",
    "Друк списку дітей віком до 16 років",
    "Друк списку працюючих жінок",
    "Друк списку всіх працівників по підрозділам(по алфавіту)",
    "Друк списку всіх працівників по підрозділам(по посадам)",
    "Друк списку кандидатів наук",
    "Друк списку докторів наук",
    "Друк списку академіків",
    "Список педагогічних і науково-педагогічних працівників",
    "Дні народження працівників"
];

export default Print;
