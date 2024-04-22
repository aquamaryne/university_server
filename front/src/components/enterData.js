import React, { useState } from 'react';
import '../css/form.css';
import EmployeerData from '../data/employeer.data';
import EducationData from '../data/education.data';
import FamilyData from '../data/family.data';
import AchieveData from '../data/achieve.data';
import SexData from '../data/sex.data';
import DomainsData from '../data/domains.data';
import DepartmentData from '../data/department.data';
import LangData from '../data/lang.data';
import MilitaryData from '../data/military.data';
import PersonalData from '../data/personal.data';
import PositionsData from '../data/positions.data';
import WorkExpData from '../data/work_exp.data';
import FamilyStatusData from '../data/family_status.data';
import FiredData from '../data/fired.data';

const EnterDataForm = () => {
    const[clicked, setClicked] = useState(false);

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
                    <AchieveData />
                    <SexData />
                    <DomainsData />
                    <DepartmentData />
                    <LangData />
                    <MilitaryData />
                    <PersonalData />
                    <PositionsData />
                    <WorkExpData />
                    <FamilyStatusData />
                    <FiredData />
                </div>
            )}
        </div>
    )
};

export default EnterDataForm;
