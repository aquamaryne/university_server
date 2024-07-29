import * as React from 'react';
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const Statistic: React.FC = () => {

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
                <Typography sx={{ color: 'black' }}>Статистика</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={hadnleClose}
            >
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/enterForStaticForm" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Ввести реквізити для статичних форм</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/formFive" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №5 - формування даних</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/editFormFive" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Корегування та друк форми №5</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/formSix" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Форма №6</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/editFormSix" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Корегування форми №6</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/listOfAges" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Список осіб віком 16-29 років, що підлягають імунизації</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/listOfOlder" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Список працівників віком старше ... років</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/listOfAllWithoutPartTimesAndBranches" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Список всіх без сумісників і філіалів</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/statistic/listOfDoctorsByDiploma" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Список кандидатів і докторів з № дипломів</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Statistic;