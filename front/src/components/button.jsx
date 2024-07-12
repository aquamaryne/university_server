import React from "react";
import { Button } from "@mui/material";

const SaveButton = () => {

    const handleSubmit = (event) => {
        fetch('http://localhost:3001/family_status', {
            method: 'POST',
        })
        .then(function(responce) {
            console.log(responce);
            return responce.json();
        })

        event.preventDefault();
    }
    return(
        <Button onClick={handleSubmit} sx={{
            border: 1,
        }}>Зберегти</Button>
    )
}

export default SaveButton;