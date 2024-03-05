import React from "react";
import { MenuItem, Menu, Button } from "@mui/material"

const Print = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick} sx={{
                border: 1,
                borderRadius: 1,
                color: "black",
                '&:hover': {
                    background: 'black',
                    color: 'white'
                },
            }}>Друк</Button>
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