import React from "react";
import { Button } from "@mui/material";

const SaveButton = () => {

    const handleSubmit = (event) => {
        fetch('http://localhost:3001', {
            method: 'POST',
        })
        .then(function(responce) {
            console.log(responce);
            return responce.json();
        })

        event.preventDefault();
    }
    return(
        <Button onClick={handleSubmit}>Зберегти</Button>
    )
}

export default SaveButton;