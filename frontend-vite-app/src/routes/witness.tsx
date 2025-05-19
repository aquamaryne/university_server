import React from "react";
import { Routes, Route } from "react-router-dom";
// import Domain from "../view/witness/domain";
// import Faculty from "../view/witness/faculty";
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
            {/* <Route path="/view/witness/domain"          element={ <Domain /> } />
            <Route path="/view/witness/faculty"         element={ <Faculty />} /> */}
            <Route path="/view/witness/familyMember"    element={ <FamilyMember />} />
            <Route path="/view/witness/hononaryTitles"  element={ <HonoraryTitles />} />
            <Route path="/view/witness/familyStatus"    element={ <FamilyStatus />} />
            <Route path="/view/witness/laborAgreement"  element={ <LaborAgreement />} />
            {/* <Route path="/view/witness/language"        element={ <Language />} /> */}
            <Route path="/view/witness/reasonOfFired"   element={ <ReasonOfFired />} />
            <Route path="/view/witness/scienceDegree"   element={ <ScienceDegree />} />
            <Route path="/view/witness/scienceDepart"   element={ <ScienceDepart />} />
            <Route path="/view/witness/scienceRank"     element={ <ScienceRank />} />
            <Route path="/view/witness/typeOfChill"     element={ <TypeOfChill />} />
            <Route path="/view/witness/work"            element={ <Work />} />
        </Routes>
    )
}

export default WitnessRoute;