import React from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import WhereFrom from "../pages/witness/whereFrom";
import IncreaseOneYear from "../pages/witness/increaseOneYear";
import DecreaseOneYear from "../pages/witness/decreaseOneYear";
import IncreaseGeneral from "../pages/witness/increaseGeneral";
import DecreaseGeneral from "../pages/witness/decreaseGeneral";
import EnterForm from "../pages/witness/enterToForm";
import ManageTeam from "../pages/witness/manageTeam";
import PrintForm from "../pages/witness/printForm";
import FormOne from "../pages/witness/formOne";
import FormTwo from "../pages/witness/formTwo";
import FormThree from "../pages/witness/formThree";
import FormFour from "../pages/witness/formFour";
import FormFive from "../pages/witness/formFive";

const Form = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [clicked, setClicked] = React.useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);

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
        handleClose();
    }

    return(
        <div>
            <Button onClick={handleClick} sx={{
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

            }}>
                <Typography>
                    Формуляр
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={() => handleMenuItemClick("Внесення звідки прийшов")}>Внесення звідки прийшов</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Збільшити всім педагогічний стаж на 1 рік")}>Збільшити всім педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Зменшити всім педагогічний стаж на 1 рік")}>Зменшити всім педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Збільшити всім загальний педагогічний стаж на 1 рік")}>Збільшити всім загальний педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Зменшити всім загальний педагогічний стаж на 1 рік")}>Зменшити всім загальний педагогічний стаж на 1 рік</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Внесення даних до формуляру")}>Внесення даних до формуляру</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Керівний склад")}>Керівний склад</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Друк штатного формуляру")}>Друк штатного формуляру</MenuItem>                    
                <MenuItem onClick={() => handleMenuItemClick("Форма №1")}>Форма №1</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Форма №2")}>Форма №2</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Форма №3")}>Форма №3</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Форма №4")}>Форма №4</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Форма №5")}>Форма №5</MenuItem>
            </Menu>
            {selectedMenuItem && (
                <div>
                    <h2>Було обрано: {selectedMenuItem}</h2>
                    {selectedMenuItem === "Внесення звідки прийшов" && <WhereFrom />}
                    {selectedMenuItem === "Збільшити всім педагогічний стаж на 1 рік" && <IncreaseOneYear />}
                    {selectedMenuItem === "Зменшити всім педагогічний стаж на 1 рік" && <DecreaseOneYear />}
                    {selectedMenuItem === "Збільшити всім загальний педагогічний стаж на 1 рік" && <IncreaseGeneral />}
                    {selectedMenuItem === "Зменшити всім загальний педагогічний стаж на 1 рік" && <DecreaseGeneral />}
                    {selectedMenuItem === "Внесення даних до формуляру" && <EnterForm />}
                    {selectedMenuItem === "Керівний склад" && <ManageTeam />}
                    {selectedMenuItem === "Друк штатного формуляру" && <PrintForm />}
                    {selectedMenuItem === "Форма №1" && <FormOne />}
                    {selectedMenuItem === "Форма №2" && <FormTwo />}
                    {selectedMenuItem === "Форма №3" && <FormThree />}
                    {selectedMenuItem === "Форма №4" && <FormFour />}
                    {selectedMenuItem === "Форма №5" && <FormFive />}
                </div>
            )}

        </div>
    )
};

export default Form;