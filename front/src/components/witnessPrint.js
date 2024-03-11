import React from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

const PrintWitness = () => { 

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
                    Друк довідників
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                <MenuItem onClick={handleClose}>Друк довідника факультетів</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника посад</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника підрозділів</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника причин звільнення</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника родинного стану</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника членів сім'ї</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника трудових угод</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника видів відпусток</MenuItem>                    
                <MenuItem onClick={handleClose}>Друк довідника вчених званнів</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника вчених ступенів</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника іноземних мов</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника наукових галузей</MenuItem>
                <MenuItem onClick={handleClose}>Друк довідника почесних званнів</MenuItem>
            </Menu>
        </div>
    )
};

export default PrintWitness;