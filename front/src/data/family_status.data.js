import React from "react";
import { postDataToTable } from "../api/data.api.post";

const FamilyStatusData = () => {
    const[familyStatusData, setFamilyStatusData] = React.useState({
        status: ''
    });

    const handleFamilyStatusChange = (e) => {
        const{name, value} = e.target;
        setFamilyStatusData({
            ...familyStatusData,
            [name]: value
        });
    };

    const handleFamilyStatusSubmit = async(e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(familyStatusData);
            console.log('Data submitted to table `Family Status`', responce[5]);
            setFamilyStatusData({
                status: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleFamilyStatusSubmit}>
                <input type='text' name='status' value={familyStatusData.status} onChange={handleFamilyStatusChange}></input>
            </form>
        </div>
    )
};

export default FamilyStatusData;