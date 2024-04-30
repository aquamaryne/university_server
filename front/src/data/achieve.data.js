import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Typography, Card } from "@mui/material";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const randomColor = getRandomColor();

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
                <Grid item xs={2} md={2} style={{ marginLeft: '54%', marginTop: '-32.34%' }}>
                    <Card  sx={{
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
                            Досягнення
                        </Typography>
                        <form onChange={handleAchieveSubmit} style={{ marginLeft: '2rem', marginTop: '-10px' }}>
                            <TextField 
                                type='text' 
                                name='achieve_name' 
                                placeholder="Ім'я досягнення" 
                                value={achieveData.achieve_name} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='honory_title' 
                                placeholder="Почесне звання" 
                                value={achieveData.honory_title} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='meritotious_title' 
                                placeholder="Почесне звання" 
                                value={achieveData.meritotious_title} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='state_awards' 
                                placeholder="Державні нагороди" 
                                value={achieveData.state_awards} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='honored_scientist' 
                                placeholder="Заслужений діяч науки" 
                                value={achieveData.honored_scientist} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='other_honors' 
                                placeholder="Інші відзнаки" 
                                value={achieveData.other_honors} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='academic' 
                                placeholder="Академічне звання"
                                value={achieveData.academic} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
                                name='member_of' 
                                placeholder="Учасник" 
                                value={achieveData.member_of} 
                                onChange={handleAchieveChange}
                                variant="filled"
                                color="warning"
                                sx={{
                                    border: 1,
                                    marginLeft: -2.5,
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
};

export default AchieveData;