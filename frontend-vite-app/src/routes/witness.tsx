import React from "react";
import { Routes, Route } from "react-router-dom";
// import Domain from "../view/witness/domain";
import FacultyPage from "../components/view/witness/faculty";
import FamilyMember from "../components/view/witness/familyMember";
import HonoraryTitles from "../components/view/witness/honoraryTitles";
import FamilyStatus from "../components/view/witness/familyStatus";
import LaborAgreement from "../components/view/witness/laborAgreement";
// import Language from "../view/witness/language";
import ReasonOfFired from "../components/view/witness/reasonOfFired";
import ScienceDegree from "../components/view/witness/scienceDegree";
import ScienceDepart from "../components/view/witness/scienceDepart";
import ScienceRank from "../components/view/witness/scienceRank";
import TypeOfChill from "../components/view/witness/typeOfChill";
import Work from "../components/view/witness/work";

const WitnessRoute: React.FC = () => {
    return(
        <Routes>
            {/* <Route path="/view/witness/domain"          element={ <Domain /> } /> */}
            <Route path="faculty"         element={ <FacultyPage />} />
            <Route path="familyMember"    element={ <FamilyMember />} />
            <Route path="hononaryTitles"  element={ <HonoraryTitles />} />
            <Route path="familyStatus"    element={ <FamilyStatus />} />
            <Route path="laborAgreement"  element={ <LaborAgreement />} />
            {/* <Route path="/view/witness/language"        element={ <Language />} /> */}
            <Route path="reasonOfFired"   element={ <ReasonOfFired />} />
            <Route path="scienceDegree"   element={ <ScienceDegree />} />
            <Route path="scienceDepart"   element={ <ScienceDepart />} />
            <Route path="scienceRank"     element={ <ScienceRank />} />
            <Route path="typeOfChill"     element={ <TypeOfChill />} />
            <Route path="work"            element={ <Work />} />
        </Routes>
    )
}

export default WitnessRoute;