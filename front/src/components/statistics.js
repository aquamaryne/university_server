import React from "react";
import { MenuItem, Menu, Button } from "@mui/material"

const Statistics = () => {
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
            }}>Статистика</Button>
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