import React from "react";
import { Grid, Box } from "@mui/material";
import Witness from "./witness";
import PersonalCard from "./personalCard";
import Print from "./print";
import Statistics from "./statistics";
import PrintWitness from "./witnessPrint";
import Form from "./form";
import Store from "./store";
import "../css/page.css";
import EnterDataForm from "./enterData";

const MainPage = () => { 
    return(
        <div>
            <Grid direction="column" container spacing={2} sx={{
                marginTop: 1,
                }} className="grid-container">
                <Box sx={{ marginLeft: 5}}>
                    <Witness />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <PersonalCard />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <Print />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <Statistics />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <PrintWitness />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <Form />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <Store />
                </Box>
                <Box sx={{ marginLeft: 1}}>
                    <EnterDataForm />
                </Box>
            </Grid>
            <div className="line"></div>
        </div>
    )
};

export default MainPage;

