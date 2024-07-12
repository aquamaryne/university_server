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


const SideBar = () => {

    return(
        <React.Fragment>
            <Grid container spacing={1} direction={"row"} >
                <Grid item>
                    <Witness /> 
                </Grid>
                <Grid item>
                    <PersonalCard />   
                </Grid>
                <Grid item>
                    <Print />
                </Grid>
                <Grid item>
                    <Statistics />
                </Grid>
                <Grid item>
                    <PrintWitness />    
                </Grid>
                <Grid item>
                    <Form />
                </Grid>
                <Grid item >
                    <Store />
                </Grid>
                <Grid item>
                    <EnterDataForm />          
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default SideBar;

