import React from "react";
import { Routes, Route } from "react-router-dom";
import WhereFrom from "../view/form/whereFrom";
// import EnterDataToForm from "../view/form/enterDataToForm";
// import ManagementTeam from "../view/form/managementTeam";
// import PrintForm from "../view/form/printForm";
// import FormOne from "../view/form/formOne";
// import FormTwo from "../view/form/formTwo";
import FormThree from "../view/form/formThree";
import FormFour from "../view/form/formFour";
import FormFive from "../view/form/formFive";
// import FormForAnother from "../view/form/formForAnother";

const FormRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/form/whereFrom"          element={ <WhereFrom />} />
            {/* <Route path="/view/form/enterDataToFrom"    element={ <EnterDataToForm />} />
            <Route path="/view/form/managementTeam"     element={ <ManagementTeam />} />
            <Route path="/view/form/printForm"          element={ <PrintForm />} />
            <Route path="/view/form/formOne"            element={ <FormOne />} />
            <Route path="/view/form/formTwo"            element={ <FormTwo />} /> */}
            <Route path="/view/form/formThree"          element={ <FormThree />} />
            <Route path="/view/form/formFour"           element={ <FormFour />} />
            <Route path="/view/form/formFive"           element={ <FormFive />} />
            {/* <Route path="/view/form/formForAnother"     element={ <FormForAnother />} /> */}
        </Routes>
    )
}

export default FormRoute;