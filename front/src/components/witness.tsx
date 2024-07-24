import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const Witness: React.FC = () => {

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
                        <Typography>Довідники</Typography>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={hadnleClose}
                    >
                        <MenuItem onClick={hadnleClose}>
                            <Link to="/view/archieve/profile" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники факультетів</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники підрозділів</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники посад</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники причин звільнення</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники родинного стану</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники членів сім'ї</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники трудових угод</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники видів відпусток</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники вчених званнів</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники вчених ступенів</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники іноземних мов</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники наукових галузей</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={hadnleClose}>
                            <Link to="" style={{ textDecoration: 'none', color: 'black' }}>
                                <Typography sx={{ textDecoration: 'none' }}>Довідники почесних званнів</Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </div>
            </ul>
        </nav>
    )
}

export default Witness