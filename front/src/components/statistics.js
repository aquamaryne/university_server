import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const Statistics = () => {
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
                <Typography>Статистика</Typography>
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
    "Внесенні реквізитів для статистичних форм",
    "Форма №5 - формування даних",
    "Корегування та друк форми №5",
    "Форма №6",
    "Список осіб віком 16-29 років, що підлягають імунизації",
    "Список працівників віком старше...років",
    "Список всіх без сумісників і філіалів",
    "Список кандитатів і докторів з № дипломів"
];

export default Statistics;
