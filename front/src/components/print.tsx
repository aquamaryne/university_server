import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const Print: React.FC = () => {

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
                Друк
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={hadnleClose}
            >
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printPersonalCard" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк особистих карток</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printByDivisions" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку співробітників по підрозділам</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printAnniversaries" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку ювілярів у поточному році</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printRetirementAge" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку співробітників пенсійного віку</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printPreRetirementAge" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку співробітників передпенсійного віку</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printPartTimers" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку сумісників</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printFromChernobyl" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку чорнобильців</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printDisableTwoThirdGroup" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку інвалідів 2-3 групи</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printNotFullWorkDay" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку працівників, що працюють неповний робочий день</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printEveryHourEmployee" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку працівників, працюючих на погодинній оплаті</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printAffairsFromWork" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк справки з місця роботи</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printFormSixExceptions" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк форми №6 - чисельність окремих категорій праціників</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printChildFromSixteen" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку дітей віком до 16 років</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printWoman" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку працюючих жінок</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printByAlphabet" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку всіх працівників по підрозділам (по алфавіту)</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printEmployeeByDivision" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку всіх працівників по підрозділам (по посадам)</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printScienceCandidate" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку кандидатів наук</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printScienceDoctors" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку докторів наук</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printAcademic" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк списку академіків</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printPedagogicalAndSciencePedagogical" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Друк педагогічних і науково-педагогічних працівників</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={hadnleClose}>
                    <Link to="/view/print/printBirthday" style={{ textDecoration: 'none', color: 'black' }}>
                        <Typography sx={{ textDecoration: 'none' }}>Дні народження працівників</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Print;