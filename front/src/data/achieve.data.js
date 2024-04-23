import React from "react";
import { postDataToTable } from "../api/data.api.post";
import { Button, TextField } from "@mui/material";

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
            <form onChange={handleAchieveSubmit}>
                <TextField type='text' name='achieve_name' placeholder="" value={achieveData.achieve_name} onChange={handleAchieveChange}/>
                <TextField type='text' name='honory_title' placeholder="" value={achieveData.honory_title} onChange={handleAchieveChange}/>
                <TextField type='text' name='meritotious_title' placeholder="" value={achieveData.meritotious_title} onChange={handleAchieveChange}/>
                <TextField type='text' name='state_awards' placeholder="" value={achieveData.state_awards} onChange={handleAchieveChange}/>
                <TextField type='text' name='honored_scientist' placeholder="" value={achieveData.honored_scientist} onChange={handleAchieveChange}/>
                <TextField type='text' name='other_honors' placeholder="" value={achieveData.other_honors} onChange={handleAchieveChange}/>
                <TextField type='text' name='academic' placeholder="" value={achieveData.academic} onChange={handleAchieveChange}/>
                <TextField type='text' name='member_of' placeholder="" value={achieveData.member_of} onChange={handleAchieveChange}/>
            </form>
        </div>
    )
};

export default AchieveData;