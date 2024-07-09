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
    const [selectedItem, setSelectedItem] = React.useState(null);

    const hanfleClick = (item) => {
        setSelectedItem(item);
    };

    return(
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Witness />
                    <PersonalCard />   
                    <Print />
                    <Statistics />
                    <PrintWitness />
                    <Form />
                    <Store />
                    <EnterDataForm />          
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default SideBar;

