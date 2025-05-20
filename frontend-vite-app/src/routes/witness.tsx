import React from "react";
import { Routes, Route } from "react-router-dom";
// import Domain from "../view/witness/domain";
import FacultyPage from "../view/witness/faculty";
import FamilyMember from "../view/witness/familyMember";
import HonoraryTitles from "../view/witness/honoraryTitles";
import FamilyStatus from "../view/witness/familyStatus";
import LaborAgreement from "../view/witness/laborAgreement";
// import Language from "../view/witness/language";
import ReasonOfFired from "../view/witness/reasonOfFired";
import ScienceDegree from "../view/witness/scienceDegree";
import ScienceDepart from "../view/witness/scienceDepart";
import ScienceRank from "../view/witness/scienceRank";
import TypeOfChill from "../view/witness/typeOfChill";
import Work from "../view/witness/work";

const WitnessRoute: React.FC = () => {
    return(
        <Routes>
            {/* <Route path="/domain"          element={ <Domain /> } /> */}
            <Route path="/faculty"         element={ <FacultyPage />} />
            <Route path="/familyMember"    element={ <FamilyMember />} />
            <Route path="/hononaryTitles"  element={ <HonoraryTitles />} />
            <Route path="/familyStatus"    element={ <FamilyStatus />} />
            <Route path="/laborAgreement"  element={ <LaborAgreement />} />
            {/* <Route path="/language"        element={ <Language />} /> */}
            <Route path="/reasonOfFired"   element={ <ReasonOfFired />} />
            <Route path="/scienceDegree"   element={ <ScienceDegree />} />
            <Route path="/scienceDepart"   element={ <ScienceDepart />} />
            <Route path="/scienceRank"     element={ <ScienceRank />} />
            <Route path="/typeOfChill"     element={ <TypeOfChill />} />
            <Route path="/work"            element={ <Work />} />
        </Routes>
    )
}

export default WitnessRoute;