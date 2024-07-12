import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

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
        <React.Fragment>
            <Button onClick={handleClick} sx={{ border: 1 }}>
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
        </React.Fragment>
    );
};


export default Statistics;
