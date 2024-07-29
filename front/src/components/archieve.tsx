import * as React from 'react';
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const Archieve: React.FC = () => {

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
                <Typography sx={{ color: 'black' }}>Архів</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={hadnleClose}
            >
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/archieve/watchCard" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Перегляд картки в архіві</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/archieve/listOfFired" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Списки звільнених викладачів за вказаний період</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/archieve/watchAndEdit" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Перегляд і коригування номерів і дат наказів на прийом і звільнення</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Archieve;