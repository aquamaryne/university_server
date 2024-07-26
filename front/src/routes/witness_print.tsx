import React from "react";
import { Routes, Route } from "react-router-dom";
import PrintFaculty from "../view/witness_print/printFaculty";
import PrintDepart from "../view/witness_print/printDepart";
import PrintWork from "../view/witness_print/printWork";
import PrintFired from "../view/witness_print/printFired";
import PrintFamilyStatus from "../view/witness_print/printFamilyStatus";
import PrintFamilyMember from "../view/witness_print/printFamilyMember";
import PrintLaborAgreement from "../view/witness_print/printLaborAgreements";
import PrintTypeChill from "../view/witness_print/printTypeChill";
import PrintScienceRank from "../view/witness_print/printScienceRank";
import PrintScienceDegree from "../view/witness_print/printScienceDegree";
import PrintLanguage from "../view/witness_print/printLanguage";
import PrintScienceDomain from "../view/witness_print/printScienceDomain";

const WitnessPrintRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/witness_print/PrintFaculty"        element={ <PrintFaculty /> } />
            <Route path="/view/witness_print/PrintDepart"         element={ <PrintDepart /> } />
            <Route path="/view/witness_print/PrintWork"           element={ <PrintWork /> } />
            <Route path="/view/witness_print/PrintFired"          element={ <PrintFired /> } />
            <Route path="/view/witness_print/PrintFamilyStatus"   element={ <PrintFamilyStatus /> } />
            <Route path="/view/witness_print/PrintFamilyMember"   element={ <PrintFamilyMember /> } />
            <Route path="/view/witness_print/PrintLaborAgreement" element={ <PrintLaborAgreement /> } />
            <Route path="/view/witness_print/PrintTypeChill"      element={ <PrintTypeChill />} />
            <Route path="/view/witness_print/PrintScienceRank"    element={ <PrintScienceRank />} />
            <Route path="/view/witness_print/PrintScienceDegree"  element={ <PrintScienceDegree />} />
            <Route path="/view/witness_print/PrintLanguage"       element={ <PrintLanguage />} />
            <Route path="/view/witness_print/PrintScienceDomain"  element={ <PrintScienceDomain /> } />
        </Routes> 
    )
}

export default WitnessPrintRoute;