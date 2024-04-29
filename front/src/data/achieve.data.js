import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Typography, Card } from "@mui/material";

const AchieveData = () => {
    const[achieveData, setAchieveData] = React.useState({
        achieve_name: '',
        honory_title: '',
        meritotious_title: '',
        state_awards: '',
        honored_scientist: '',
        other_honors: '',
        academic: '',
        member_of: ''
    });

    const handleAchieveChange = (e) => {
        const{ name, value } = e.target;
        setAchieveData({
            ...achieveData,
            [name]: value
        });
    };

    const handleAchieveSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(achieveData);
            console.log('Data submitted to table `Achieve`', responce[13]);
            setAchieveData({
                achieve_name: '',
                honory_title: '',
                meritotious_title: '',
                state_awards: '',
                honored_scientist: '',
                other_honors: '',
                academic: '',
                member_of: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <Grid container alignItems='center' sx={{ padding: 1 }}>
                <Grid item xs={10} md={4}>
                    <Card  sx={{
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
                            Досягнення
                        </Typography>
                        <form onChange={handleAchieveSubmit} style={{ marginLeft: '2rem', marginTop: '-10px' }}>
                            <TextField 
                                type='text' 
                                name='achieve_name' 
                                placeholder="Ім'я досягнення" 
                                value={achieveData.achieve_name} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='honory_title' 
                                placeholder="Почесне звання" 
                                value={achieveData.honory_title} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='meritotious_title' 
                                placeholder="Почесне звання" 
                                value={achieveData.meritotious_title} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />                                   
                            <TextField 
                                type='text' 
                                name='state_awards' 
                                placeholder="Державні нагороди" 
                                value={achieveData.state_awards} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='honored_scientist' 
                                placeholder="Заслужений діяч науки" 
                                value={achieveData.honored_scientist} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />
                            <TextField 
                                type='text' 
                                name='other_honors' 
                                placeholder="Інші відзнаки" 
                                value={achieveData.other_honors} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />                                  
                            <TextField 
                                type='text' 
                                name='academic' 
                                placeholder="Академічне звання"
                                value={achieveData.academic} 
                                onChange={handleAchieveChange}
                                sx={{
                                    padding: 1,
                                }}
                            />                                                                   
                            <TextField 
                                type='text' 
                                name='member_of' 
                                placeholder="Учасник" 
                                value={achieveData.member_of} 
                                onChange={handleAchieveChange}
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
};

export default AchieveData;