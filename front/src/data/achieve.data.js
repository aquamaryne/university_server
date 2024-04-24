import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { TextField, Grid, Paper, Typography } from "@mui/material";
import "../css/achieve.css";

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
            <Grid container alignItems='center'>
                <Grid item xs={2}>
                    <Paper elevation={3} sx={{
                        padding: '3px',
                    }}>
                        <Typography>Досягнення</Typography>
                       <form onChange={handleAchieveSubmit}>
                            <TextField type='text' name='achieve_name' placeholder="Ім'я досягнення" value={achieveData.achieve_name} onChange={handleAchieveChange}/>
                            <TextField type='text' name='honory_title' placeholder="Почесне звання" value={achieveData.honory_title} onChange={handleAchieveChange}/>
                            <TextField type='text' name='meritotious_title' placeholder="Почесне звання" value={achieveData.meritotious_title} onChange={handleAchieveChange}/>                                   
                            <TextField type='text' name='state_awards' placeholder="Державні нагороди" value={achieveData.state_awards} onChange={handleAchieveChange}/>
                            <TextField type='text' name='honored_scientist' placeholder="Заслужений діяч науки" value={achieveData.honored_scientist} onChange={handleAchieveChange}/>
                            <TextField type='text' name='other_honors' placeholder="Інші відзнаки" value={achieveData.other_honors} onChange={handleAchieveChange}/>                                  
                            <TextField type='text' name='academic' placeholder="Академічне звання" value={achieveData.academic} onChange={handleAchieveChange}/>                                                                   
                            <TextField type='text' name='member_of' placeholder="Учасник" value={achieveData.member_of} onChange={handleAchieveChange}/>                                    
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default AchieveData;