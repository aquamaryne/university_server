import React from "react";
import { postDataToTable } from "../api/data.api.post";

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
            <form onSubmit={handleMilitarySubmit}>
                <input type='text' name="accounting_group" value={militaryAppearanceData.accounting_group} onChange={handleMilitaryChange}></input>
                <input type='text' name="accounting_category" value={militaryAppearanceData.accounting_category} onChange={handleMilitaryChange}></input>
                <input type='text' name="depot" value={militaryAppearanceData.depot} onChange={handleMilitaryChange}></input>
                <input type='text' name="military_rank" value={militaryAppearanceData.military_rank} onChange={handleMilitaryChange}></input>
                <input type='text' name="military_accounting_specialty" value={militaryAppearanceData.military_accounting_specialty} onChange={handleMilitaryChange}></input>
                <input type='text' name="num" value={militaryAppearanceData.num} onChange={handleMilitaryChange}></input>
                <input type='text' name="suitability_for_military_service" value={militaryAppearanceData.suitability_for_military_service} onChange={handleMilitaryChange}></input>
                <input type='text' name="name_of_the_military_office_at_the_place_of_residence" value={militaryAppearanceData.name_of_the_military_office_at_the_place_of_residence} onChange={handleMilitaryChange}></input>
            </form>
        </div>
    )
}

export default MilitaryData;