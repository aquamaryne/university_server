import React from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const Witness = () => { 

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
                    Довідники
                </Typography> 
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={handleClose}>Довідник факультетів</MenuItem>
                <MenuItem onClick={handleClose}>Довідник посад</MenuItem>
                <MenuItem onClick={handleClose}>Довідник підрозділів</MenuItem>
                <MenuItem onClick={handleClose}>Довідник причин звільнення</MenuItem>
                <MenuItem onClick={handleClose}>Довідник родинного стану</MenuItem>
                <MenuItem onClick={handleClose}>Довідник членів сім'ї</MenuItem>
                <MenuItem onClick={handleClose}>Довідник трудових угод</MenuItem>
                <MenuItem onClick={handleClose}>Довідник видів відпусток</MenuItem>                    
                <MenuItem onClick={handleClose}>Довідник вчених званнів</MenuItem>
                <MenuItem onClick={handleClose}>Довідник вчених ступенів</MenuItem>
                <MenuItem onClick={handleClose}>Довідник іноземних мов</MenuItem>
                <MenuItem onClick={handleClose}>Довідник наукових галузей</MenuItem>
                <MenuItem onClick={handleClose}>Довідник почесних званнів</MenuItem>
            </Menu>
        </div>
    )
};

export default Witness;