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
        <nav>
            <ul>
                <div>
                    <Button sx={{ border: 1 }} onClick={hadnleClick}>
                        <Typography>Друк</Typography>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={hadnleClose}
                    >
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк особистих карток</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку співробітників по підрозділам</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку ювілярів у поточному році</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку співробітників пенсійного віку</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку співробітників передпенсійного віку</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку сумісників</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку чорнобильців</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку інвалідів 2-3 групи</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку працівників, що працюють неповний робочий день</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку працівників, працюючих на погодинній оплаті</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк справки з місця роботи</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк форми №6 - чисельність окремих категорій праціників</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку дітей віком до 16 років</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку працюючих жінок</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку всіх працівників по підрозділам (по алфавіту)</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку всіх працівників по підрозділам (по посадам)</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку кандидатів наук</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку докторів наук</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк списку академіків</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Друк педагогічних і науково-педагогічних працівників</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Дні народження працівників</Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </div>
            </ul>
        </nav>
    )
}

export default Print;