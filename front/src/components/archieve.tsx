import React from "react";
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import Profile from "../view/profile";
import '../css/profile.css';

const Archieve: React.FC = () => {
    const[anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showProfile, setShowProfile] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handledProfileClick = () => {
        setAnchorEl(null);
        setShowProfile(true);
    }

    return (
        <div>
            <Button onClick={handleClick}>Aрхів</Button>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handledProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Menu>
            {showProfile && <div className="profile-container"><Profile /></div>}
        </div>
    )
}

export default Archieve;