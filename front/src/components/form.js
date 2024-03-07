import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Form = () => { 

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
                    boxShadow: '-4px 2px 2px 0 purple',
                },
                transition: 'box-shadow 0.3s'

            }}>
                Формуляр
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={handleClose}>Внесення звідки прийшов</MenuItem>
                <MenuItem onClick={handleClose}>Збільшити всім педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={handleClose}>Зменшити всім педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={handleClose}>Збільшити всім агальний педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={handleClose}>Зменшити всім загальний педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={handleClose}>Внесення даних до формуляру</MenuItem>
                <MenuItem onClick={handleClose}>Керівний склад</MenuItem>
                <MenuItem onClick={handleClose}>Друк штатного формуляру</MenuItem>                    
                <MenuItem onClick={handleClose}>Форма №1</MenuItem>
                <MenuItem onClick={handleClose}>Форма №2</MenuItem>
                <MenuItem onClick={handleClose}>Форма №3</MenuItem>
                <MenuItem onClick={handleClose}>Форма №4</MenuItem>
                <MenuItem onClick={handleClose}>Форма №5</MenuItem>
            </Menu>
        </div>
    )
};

export default Form;