import * as React from 'react';
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const Form: React.FC = () => {

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
                border: 2,
                borderRadius: 1,
                backgroundColor: '#fdf6e3',
                borderColor: '#002b36',
                color: 'black',
                fontSize: '100%',
                '&:hover': {
                    backgroundColor: 'black',
                    color: 'white'
                }
            }} onClick={hadnleClick}>
                Формуляр
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={hadnleClose}
            >
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/whereFrom" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Занести звідки прийшов</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/enterDataToFrom" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Введення даних до формуляру</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/managementTeam" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Керівний склад</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/printForm" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк штатного формуляру</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/formOne" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №1. Список академікі, член-корів</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/formTwo" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №2. Список сумісників на неповну ставку</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/formThree" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №3. Список викладачів, кандидатів наук, що працюють над док. дисерт.</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/formFour" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №4. Кількісний і якісний склад викладачів, факультетів, ВУЗу</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/form/formFive" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №5. Відомість про професорсько-викладацькому складу</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Form;