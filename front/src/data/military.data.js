import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

const MilitaryData = () => {
    const[militaryAppearanceData, setMilitaryAppearanceData] = React.useState({
        accounting_group: '',
        accounting_category: '',
        depot: '',
        military_rank: '',
        military_accounting_specialty: '',
        num: '',
        suitability_for_military_service: '',
        name_of_the_military_office_at_the_place_of_residence: ''
    });

    const handleMilitaryChange = (e) => {
        const{name, value} = e.target;
        setMilitaryAppearanceData({
            ...militaryAppearanceData,
            [name]: value
        })
    };

    const handleMilitarySubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(militaryAppearanceData);
            console.log('Data submitted to table `Military Appearance`', responce[8]);
            setMilitaryAppearanceData({
                accounting_group: '',
                accounting_category: '',
                depot: '',
                military_rank: '',
                military_accounting_specialty: '',
                num: '',
                suitability_for_military_service: '',
                name_of_the_military_office_at_the_place_of_residence: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={10} md={4}>
                    <Card sx={{
                        padding: '20px',
                        border: 1,
                        borderRadius: 2,
                    }}>
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
                                marginRight: '10rem',
                                marginLeft: '10rem',
                            }}
                        >
                            Військовий облік
                        </Typography>
                        <form onSubmit={handleMilitarySubmit}>
                            <TextField 
                                type='text' 
                                name="accounting_group" 
                                value={militaryAppearanceData.accounting_group} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="accounting_category" 
                                value={militaryAppearanceData.accounting_category} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="depot" 
                                value={militaryAppearanceData.depot} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="military_rank" 
                                value={militaryAppearanceData.military_rank} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="military_accounting_specialty" 
                                value={militaryAppearanceData.military_accounting_specialty} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="num" 
                                value={militaryAppearanceData.num} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="suitability_for_military_service" 
                                value={militaryAppearanceData.suitability_for_military_service} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="name_of_the_military_office_at_the_place_of_residence" 
                                value={militaryAppearanceData.name_of_the_military_office_at_the_place_of_residence} 
                                onChange={handleMilitaryChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default MilitaryData;