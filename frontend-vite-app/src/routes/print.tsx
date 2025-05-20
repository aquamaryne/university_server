import React from "react";
import { Routes, Route } from "react-router-dom";
import PrintAcademic from "../components/view/print/printAcademic";
import PrintAffairsFromWork from "../components/view/print/printAffairsFromWork";
import PrintAnniversaries from "../components/view/print/printAnniversaries";
import PrintBirthday from "../components/view/print/printBirthday";
import PrintByAlphabet from "../components/view/print/printbyAlphabet";
import PrintByDivisionss from "../components/view/print/printByDivisions";
import PrintChildFromSixteen from "../components/view/print/printChildFromSixteen";
import PrintDisableTwoThirdGroup from "../components/view/print/printDisableTwoThrirdGroup";
import PrintEmployeeByDivision from "../components/view/print/printEmployeerByDivision";
import PrintEveryHourEmployee from "../components/view/print/printEveryHourEmployee";
import PrintFormSixExceptions from "../components/view/print/printFormSixExceptions";
import PrintFromChernobyl from "../components/view/print/printFromChernobyl";
import PrintNotFullWorkDay from "../components/view/print/printNotFullWorkDay";
import PrintPartTimers from "../components/view/print/printPartTimers";
import PrintPedagogicalAndSciencePedagocical from "../components/view/print/printPedagogicalAndSciencePedogocial";
import PrintPersonalCard from "../components/view/print/printPersonalCard";
import PrintPreRetirementAge from "../components/view/print/printPreRetirementAge";
import PrintRetirementAge from "../components/view/print/printRetirementAge";
import PrintScienceCandidate from "../components/view/print/printScienceCandidate";
import PrintScienceDoctors from "../components/view/print/printScienceDoctors";
import PrintWoman from "../components/view/print/printWoman";

const PrintRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/view/print/printAcademic"                         element={ <PrintAcademic />} />
            <Route path="/view/print/printAffairsFromWork"                  element={ <PrintAffairsFromWork />} />
            <Route path="/view/print/printAnniversaries"                    element={ <PrintAnniversaries />} />
            <Route path="/view/print/printBirthday"                         element={ <PrintBirthday />} />
            <Route path="/view/print/printByAlphabet"                       element={ <PrintByAlphabet />} />
            <Route path="/view/print/printByDivisions"                      element={ <PrintByDivisionss />} />
            <Route path="/view/print/printChildFromSixteen"                 element={ <PrintChildFromSixteen />} />
            <Route path="/view/print/printDisableTwoThirdGroup"             element={ <PrintDisableTwoThirdGroup />} />
            <Route path="/view/print/printEmployeeByDivision"               element={ <PrintEmployeeByDivision />} />
            <Route path="/view/print/printEveryHourEmployee"                element={ <PrintEveryHourEmployee />} />
            <Route path="/view/print/printFormSixExceptions"                element={ <PrintFormSixExceptions />} />
            <Route path="/view/print/printFromChernobyl"                    element={ <PrintFromChernobyl />} />
            <Route path="/view/print/printNotFullWorkDay"                   element={ <PrintNotFullWorkDay />} />
            <Route path="/view/print/printPartTimers"                       element={ <PrintPartTimers />} />
            <Route path="/view/print/printPedagogicalAndSciencePedagogical" element={ <PrintPedagogicalAndSciencePedagocical />} />
            <Route path="/view/print/printPersonalCard"                     element={ <PrintPersonalCard />} />
            <Route path="/view/print/printPreRetirementAge"                 element={ <PrintPreRetirementAge />} />
            <Route path="/view/print/printRetirementAge"                    element={ <PrintRetirementAge />} />
            <Route path="/view/print/printScienceCandidate"                 element={ <PrintScienceCandidate />} />
            <Route path="/view/print/printScienceDoctors"                   element={ <PrintScienceDoctors />} />
            <Route path="/view/print/printWoman"                            element={ <PrintWoman />} />
        </Routes>
    )
}

export default PrintRoute;