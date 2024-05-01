import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography, Card } from "@mui/material";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const randomColor = getRandomColor();

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
                <Grid item xs={4} md={2} style={{ marginLeft: '72%', marginTop: '-49.5%' }}>
                    <Card sx={{
                        padding: '20px',
                        border: 1.9,
                        borderRadius: 0,
                        marginLeft: '10px',
                        transition: 'background-color 0.3s ease-in-out, transform 0.1s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                            transition: 'translateX(5px)',
                            boxShadow: `-4px 4px 0px ${randomColor}`,
                            borderColor: randomColor,
                        },
                    }}>
                        <Typography variant="h6"
                            sx={{ 
                                marginBottom: '20px',
                                fontSize: 30,
                                fontFamily: 'monospace',
                                color: 'indigo',
                                marginRight: '2rem',
                                marginLeft: '3rem',
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
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="accounting_category" 
                                value={militaryAppearanceData.accounting_category} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="depot" 
                                value={militaryAppearanceData.depot} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="military_rank" 
                                value={militaryAppearanceData.military_rank} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="military_accounting_specialty" 
                                value={militaryAppearanceData.military_accounting_specialty} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="num" 
                                value={militaryAppearanceData.num} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="suitability_for_military_service" 
                                value={militaryAppearanceData.suitability_for_military_service} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
                                }}
                            />
                            <TextField 
                                type='text' 
                                name="name_of_the_military_office_at_the_place_of_residence" 
                                value={militaryAppearanceData.name_of_the_military_office_at_the_place_of_residence} 
                                onChange={handleMilitaryChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: 1,
                                    marginBottom: 1,
                                    backgroundColor: 'white',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: randomColor,
                                        transform: 'translateX(3px) scale(1.02)',
                                    }
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