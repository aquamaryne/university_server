import React from "react";
import { postDataToTable } from "../api/data.api.post";

const AchieveData = () => {
    const[achieveData, setAchieveData] = useState({
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
            const responce = await postDataToTable(familyData);
            console.log('Data submitted to table `Education`', responce[12]);
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
            <form onChange={handleAchieveChange}>

            </form>
        </div>
    )
}