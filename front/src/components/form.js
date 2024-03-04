import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Form = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick}>Формуляр </Button>
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