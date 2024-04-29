import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

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
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={2}>
                    <Card elevation={2} sx={{ padding: "20px", border: 1,}}>
                        <Typography variant="h6"
                            sx={{ 
                                marginBottom: '20px',
                                textAlign: 'center',
                                border: 1, 
                                borderWidth: 1,
                                borderColor: '#1f1f1f',
                                borderRadius: 2,
                                color: 'royalblue',
                                backgroundColor: '#2b2b2a',
                                marginRight: '3rem',
                                marginLeft: '3rem',
                            }}
                        >Посада
                        </Typography>
                        <form onSubmit={handleDomainSubmit} style={{ marginLeft: '1rem' }}>
                            <TextField 
                                type='text' 
                                name="domain_name" 
                                label="Посада"
                                value={domainsData.domain_name} 
                                onChange={handleDomainChange} 
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default DomainsData;