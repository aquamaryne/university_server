import React, { useState } from 'react';
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
import { Button, Grid } from '@mui/material';
import SaveButton from './button';

const EnterDataForm = () => {
    const[clicked, setClicked] = useState(false);

    const handleClicked = () => {
        setClicked(prevClicked => !prevClicked);
    };

    return (
        <div>
            <Button onClick={handleClicked} sx={{
                border: 1
            }}>
                Внесення даних
            </Button>
            {clicked &&(
                <React.Fragment>
                    <Grid container spacing={2} style={{ marginLeft: '4.4%' }}>
                        <Grid item xs={12} sm={12}>
                            <EmployeerData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <EducationData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FamilyData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <AchieveData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <SexData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DomainsData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DepartmentData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <LangData />
                        </Grid>
                        <Grid item xs={12} sm={12}>                            
                            <MilitaryData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <PersonalData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <PositionsData />
                        </Grid>
                        <Grid item xs={12} sm={12}>  
                            <WorkExpData />
                        </Grid>
                        <Grid item xs={12} sm={12}>    
                            <FamilyStatusData />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FiredData />
                        </Grid>
                        <Grid style={{ marginLeft: '2%' }}>
                            <SaveButton />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
        </div>
    )
};

export default EnterDataForm;
