import React from "react";
import { MenuItem, Menu, Button, Typography } from "@mui/material"

const Print = () => {
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
                    Друк
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Друк особової картки</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку співробітників по підрозділам</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку ювілярів у поточному році</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку співробітників пенсійного віку</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку співробітників передпенсійного віку</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку сумісників</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку чорнобильців</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку інвалідів 2-3 груп</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку працівників, що працюють неповний робочий день</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку викладачів, що працюють на погодинній оплаті</MenuItem>
                <MenuItem onClick={handleClose}>Друк справки з місця роботи</MenuItem>
                <MenuItem onClick={handleClose}>Друк форми №6 - чисельність окремих категорій працівників</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку дітей віком до 16 років</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку працюючих жінок</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку всіх працівників по підрозділам(по алфавіту)</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку всіх працівників по підрозділам(по посадам)</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку кандидатів наук</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку докторів наук</MenuItem>
                <MenuItem onClick={handleClose}>Друк списку академіків</MenuItem>
                <MenuItem onClick={handleClose}>Список педагогічних і науково-педагогічних працівників</MenuItem>
                <MenuItem onClick={handleClose}>Дні народження працівників</MenuItem>
            </Menu>
        </div>
    )
}

export default Print;