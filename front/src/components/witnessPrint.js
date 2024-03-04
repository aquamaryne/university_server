import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const PrintWitness = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick}>Друк довідників</Button>
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