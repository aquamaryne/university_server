import React, { useState } from 'react';
import '../css/form.css';
import EmployeerData from '../data/employeer.data';
import EducationData from '../data/education.data';
import FamilyData from '../data/family.data';

const EnterDataForm = () => {
    const[clicked, setClicked] = useState(false);

    // const[departmentData, setDepartmentData] = useState({
    //     department_name: ''
    // });

    // const[domainsData, setDomainsData] = useState({
    //     domain_name: '',
    // });

    // const[familyStatusData, setFamilyStatusData] = useState({
    //     status: ''
    // });

    // const[firedData, setFiredData] = useState({
    //     date_of_fired: '',
    //     unique_card: '',
    //     identify_code: ''
    // });

    // const[langData, setLangData] = useState({
    //     first_lang_name: '',
    //     second_lang_name: ''
    // });

    // const[militaryAppearanceData, setMilitaryAppearanceData] = useState({
    //     accounting_group: '',
    //     accounting_category: '',
    //     depot: '',
    //     military_rank: '',
    //     military_accounting_specialty: '',
    //     num: '',
    //     suitability_for_military_service: '',
    //     name_of_the_military_office_at_the_place_of_residence: ''
    // });

    // const[personalInfoData, setPersonalInfoData] = useState({
    //     unique_card: '',
    //     serial_num_of_passport: '',
    //     issued_by: '',
    //     place_of_living: '',
    //     mobile_phone_number: ''
    // });

    // const[positionsData, setPositionsData] = useState({
    //     position_name: '',
    //     data_of_entry: '',
    //     type_of_study: '',
    //     position_where_work_now: '',
    //     number_of_order: ''
    // });

    // const[sexData, setSexData] = useState({
    //     sex_name: ''
    // });

    // const[workExperience, setWorkExperience] = useState({
    //     global_work_exp: '',
    //     global_science_exp: '',
    //     science_at_this_university: '',
    //     continuous_work_exp: ''
    // })

    const handleClicked = () => {
        setClicked(prevClicked => !prevClicked);
    };

    return (
        <div>
            <button onClick={handleClicked}>Внесення даних</button>
            {clicked &&(
                <div>
                    <EmployeerData />
                    <EducationData />
                    <FamilyData />
                </div>
            )}
        </div>
    )
};

export default EnterDataForm;
