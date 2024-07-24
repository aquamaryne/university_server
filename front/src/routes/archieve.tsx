import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../view/archieve/profile";

const ArchieveRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/archieve/profile" element={ <Profile />} />
        </Routes>
    )
}

export default ArchieveRoute;