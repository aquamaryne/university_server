import React from "react";
import { Routes, Route } from "react-router-dom";
import EditForStaticForm from "../view/statistic/enterForStaticForm";
import FormFive from "../view/statistic/formFive";
import EditFormFive from "../view/statistic/editFormFive";
import FormSix from "../view/statistic/formSix";
import FormSixEdit from "../view/statistic/formSixEdit";
import ListOfAges from "../view/statistic/listOfAges";
import ListOfOlder from "../view/statistic/listOfOlder";
import ListOfAllWithoutPartTimesAndBranches from "../view/statistic/listOfAfllWithoutPartTimesAndBranches";
import ListOfDoctorsByDiploma from "../view/statistic/listOfDoctorsByDimploma";

const StatisticRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/statistic/enterForStaticForm" element={ <EditForStaticForm />} />
            <Route path="/view/statistic/formFive" element={ <FormFive />} />
            <Route path="/view/statistic/editFormFive" element={ <EditFormFive />} />
            <Route path="/view/statistic/formSix" element={ <FormSix />} />
            <Route path="/view/statistic/editFormSix" element={ <FormSixEdit />} />
            <Route path="/view/statistic/listOfAges" element={ <ListOfAges />} />
            <Route path="/view/statistic/listOfOlder" element={ <ListOfOlder />} />
            <Route path="/view/statistic/listOfAllWithoutPartTimesAndBranches" element={ <ListOfAllWithoutPartTimesAndBranches />} />
            <Route path="/view/statistic/listOfDoctorsByDiploma" element={ <ListOfDoctorsByDiploma />} />
        </Routes>
    )
}

export default StatisticRoute;