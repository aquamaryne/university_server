import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography, Select, TextField, Grid, Box, Button, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { postDataToTable } from "../../api/data.api.post";

const EnterPersonalCard: React.FC = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async(data: any) => {
        try{
            await postDataToTable(data);
            reset();
            alert('Data enter success');
        } catch(error) {
            console.error('Error while send data', error);
            alert('Error sending data');
        };
    };

    return(
        <React.Fragment>
            <
        </React.Fragment>
    )
} 
export default EnterPersonalCard;