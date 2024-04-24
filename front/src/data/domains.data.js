import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";

const DomainsData = () => {
    const[domainsData, setDomainsData] = React.useState({
        domain_name: '',
    });

    const handleDomainChange = (e) => {
        const{name, value} = e.target;
        setDomainsData({
            ...domainsData,
            [name]: value
        });
    };

    const handleDomainSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(domainsData);
            console.log('Data submitted to table `Domains`', responce[6]);
            setDomainsData({
                domain_name: '',
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center'>
                <Grid item>
                    <Paper elevation={2} sx={{ padding: "2px" }}>
                        <Typography>Посада</Typography>
                        <form onSubmit={handleDomainSubmit}>
                            <TextField 
                                type='text' 
                                name="domain_name" 
                                label="Посада"
                                value={domainsData.domain_name} 
                                onChange={handleDomainChange} 
                            />
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default DomainsData;