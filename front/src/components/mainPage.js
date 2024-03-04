import React from "react";
import { Grid, Box } from "@mui/material";
import Witness from "./witness";
import PersonalCard from "./personalCard";
import Print from "./print";
import Statistics from "./statistics";
import PrintWitness from "./witnessPrint";
import Form from "./form";
import Store from "./store";

const MainPage = () => { 
    return(
        <Grid container spacing={2} justifyContent={"center"} sx={{
            marginTop: 1,
            border: 1,
        }}>
            <Box sx={{
                borderRight: 1,
            }}>
                <Witness />
            </Box>
            <Box sx={{
                borderRight: 1,
            }}>
                <PersonalCard />
            </Box>
            <Box sx={{
                borderRight: 1,
            }}>
                <Print />
            </Box>
            <Box sx={{
                borderRight: 1,
            }}>
                <Statistics />
            </Box>
            <Box sx={{
                borderRight: 1,
            }}>
                <PrintWitness />
            </Box>
            <Box sx={{
                borderRight: 1,
            }}>
                <Form />
            </Box>
            <Box>
                <Store />
            </Box>
        </Grid>
    )
};

export default MainPage;