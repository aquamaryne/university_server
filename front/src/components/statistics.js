import React from "react";
import { MenuItem, Menu, Button } from "@mui/material"

const Statistics = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick}>Статистика</Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={handleClose}>Внесенні реквізитів для статистичних форм</MenuItem>
                <MenuItem onClick={handleClose}>Форма №5 - формування даних</MenuItem>
                <MenuItem onClick={handleClose}>Корегування та друк форми №5</MenuItem>
                <MenuItem onClick={handleClose}>Форма №6</MenuItem>
                <MenuItem onClick={handleClose}>Список осіб віком 16-29 років, що підлягають імунизації</MenuItem>
                <MenuItem onClick={handleClose}>Список працівників віком старше...років</MenuItem>
                <MenuItem onClick={handleClose}>Список всіх без сумісників і філіалів</MenuItem>
                <MenuItem onClick={handleClose}>Список кандитатів і докторів з № дипломів</MenuItem>
            </Menu>
        </div>
    )
}

export default Statistics;