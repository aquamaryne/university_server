import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Witness = () => { 

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button onClick={handleClick}>Довідники </Button>
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