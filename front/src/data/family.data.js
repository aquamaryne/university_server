import React from "react";
import { postDataToTable } from "../api/data.api.post";

const FamilyData = () => {
    const[familyData, setFamilyData] = React.useState({
        count_of_children: '',
        children_name: '',
        year_of_birth_children: ''
    });

    const handleFamilyChange = (e) => {
        const { name, value } = e.target;
        setFamilyData({
            ...familyData,
            [name]: value,
        });
    };

    const handleFamilySubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(familyData);
            console.log('Data submitted to table `Education`', responce[8]);
            setFamilyData({
                count_of_children: '',
                children_name: '',
                year_of_birth_children: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleFamilySubmit}>
                <input type='text' name="count_of_children" placeholder="" value={familyData.count_of_children} onChange={handleFamilyChange}></input>
                <input type='text' name="children_name" placeholder="" value={familyData.children_name} onChange={handleFamilyChange}></input>
                <input type='text' name="year_of_birth_children" placeholder="" value={familyData.year_of_birth_children}></input>
            </form>
        </div>
    )
};

export default FamilyData;