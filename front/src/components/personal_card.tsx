import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const Personal_Card: React.FC = () => {

    const[anchorEl, setAnchorEl]= React.useState<null | HTMLElement>(null);

    const hadnleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const hadnleClose = () => {
        setAnchorEl(null);
    };

    return( 
        <div>
            <Button sx={{ 
                border: 1,
                borderRadius: 0.5,
                backgroundColor: '#fdf6e3',
                borderColor: '#002b36',
                '&:hover': {
                    backgroundColor: '#eee8d5',
                }
            }} onClick={hadnleClick}>
                <Typography sx={{ color: 'black' }}>Особисті картки</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={hadnleClose}
            >
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/personal_card/enterPersonalCard" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Ввод особистих карток</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/personal_card/searchBySurname" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Пошук по прізвищу</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Personal_Card;