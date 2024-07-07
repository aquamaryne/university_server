import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

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
            <Button onClick={handleClick} sx={{
                border: 1,
                paddingLeft: "7%",
            }}>
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


export default Print;
