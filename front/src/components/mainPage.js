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
        <div>
            <Grid direction="column" container spacing={2} sx={{ marginTop: 1 }} className="grid-container">
                <Grid item xs={2} sx={{ height: '100vh', overflowY: 'auto'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box >
                            <Witness />
                        </Box>
                        <Box >
                            <PersonalCard />
                        </Box>
                        <Box >
                            <Print />
                        </Box>
                        <Box>
                            <Statistics />
                        </Box>
                        <Box>
                            <PrintWitness />
                        </Box>
                        <Box >
                            <Form />
                        </Box>
                        <Box>
                            <Store />
                        </Box>
                        <Box>
                            <EnterDataForm />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
};

export default SideBar;

