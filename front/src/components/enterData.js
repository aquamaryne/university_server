import React, { useState } from 'react';
import { postDataToTable } from '../api/data.api.post';
import '../css/form.css';

const EnterDataForm = () => {
    const[clicked, setClicked] = useState(false);
    const[employeerData, setEmployeerData] = useState({
        fname: '',
        sname: '',
        fatherly: '',
        date_of_birth: ''
    });

    const[educationData, setEducationData] = useState({
        diploma: '',
        number_of_diploma: '',
        name_of_the_high_university: '',
        name_of_the_middle_university: '',
        status_of_education: '',
        academic_title: '',
    });

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

    const[departmentData, setDepartmentData] = useState({
        department_name: ''
    });

    const[domainsData, setDomainsData] = useState({
        domain_name: '',
    });

    const[familyData, setFamilyData] = useState({
        count_of_children: '',
        children_name: '',
        year_of_birth_children: ''
    });

    const[familyStatusData, setFamilyStatusData] = useState({
        status: ''
    });

    const[firedData, setFiredData] = useState({
        date_of_fired: '',
        unique_card: '',
        identify_code: ''
    });

    const[langData, setLangData] = useState({
        first_lang_name: '',
        second_lang_name: ''
    });

    const[militaryAppearanceData, setMilitaryAppearanceData] = useState({
        accounting_group: '',
        accounting_category: '',
        depot: '',
        military_rank: '',
        military_accounting_specialty: '',
        num: '',
        suitability_for_military_service: '',
        name_of_the_military_office_at_the_place_of_residence: ''
    });

    const[personalInfoData, setPersonalInfoData] = useState({
        unique_card: '',
        serial_num_of_passport: '',
        issued_by: '',
        place_of_living: '',
        mobile_phone_number: ''
    });

    const[positionsData, setPositionsData] = useState({
        position_name: '',
        data_of_entry: '',
        type_of_study: '',
        position_where_work_now: '',
        number_of_order: ''
    });

    const[sexData, setSexData] = useState({
        sex_name: ''
    });

    const[workExperience, setWorkExperience] = useState({
        global_work_exp: '',
        global_science_exp: '',
        science_at_this_university: '',
        continuous_work_exp: ''
    })

    const handleClicked = () => {
        setClicked(prevClicked => !prevClicked);
    };
    
    const handleEmployeerChange = (e) => {
        const { name, value } = e.target;
        setEmployeerData(({
            ...employeerData,
            [name]: value
        }));
    };

    const handleEmployeerSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await postDataToTable(employeerData);
            console.log('Data submitted to table `Employeers`', responce[0]);
            setEmployeerData({
                fname: '',
                sname: '',
                fatherly: '',
                date_of_birth: '',
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleClicked}>Внесення даних</button>
            {clicked && (
                <form onSubmit={handleEmployeerSubmit}>
                    <input type='text' name='fname' placeholder="Ім'я" value={employeerData.fname} onChange={handleEmployeerChange}></input>
                    <input type='text' name='sname' placeholder="Прізвище" value={employeerData.sname} onChange={handleEmployeerChange}></input>
                    <input type='text' name='fatherly' placeholder="По батькові" value={employeerData.fatherly} onChange={handleEmployeerChange}></input>
                    <input type='text' name='date_of_birth' placeholder="Дата народження" value={employeerData.date_of_birth} onChange={handleEmployeerChange}></input>
                    <button type='submit'>Зберегти</button>
                </form>
            )}
        </div>
    )
};

export default EnterDataForm;
