import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import WhereFrom from "../pages/witness/whereFrom";
import EnterForm from "../pages/witness/enterToForm";
import ManageTeam from "../pages/witness/manageTeam";
import PrintForm from "../pages/witness/printForm";
import FormOne from "../pages/witness/formOne";
import FormTwo from "../pages/witness/formTwo";
import FormThree from "../pages/witness/formThree";
import FormFour from "../pages/witness/formFour";
import FormFive from "../pages/witness/formFive";

const Form = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (content) => {
        setSelectedMenuItem(content);
        handleClose();
    };

    const menuItems = [
        "Внесення звідки прийшов",
        "Внесення даних до формуляру",
        "Керівний склад",
        "Друк штатного формуляру",
        "Форма №1",
        "Форма №2",
        "Форма №3",
        "Форма №4",
        "Форма №5"
    ];

    const renderMenuItem = (menuItem) => (
        <MenuItem key={menuItem} onClick={() => handleMenuItemClick(menuItem)}>
            {menuItem}
        </MenuItem>
    );

    return (
        <div>
            <Button onClick={handleClick} sx={{ 
                border: 1, 
            }}>
                <Typography sx={{ marginRight: 10 }}>
                    Формуляр
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map(renderMenuItem)}
            </Menu>
            {selectedMenuItem && (
                <div>
                    <h2>Було обрано: {selectedMenuItem}</h2>
                    {selectedMenuItem === "Внесення звідки прийшов" && <WhereFrom />}
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
    );
};

export default Form;
