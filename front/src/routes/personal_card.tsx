import React from "react";
import { Routes, Route } from "react-router-dom";
import EnterPersonalCard from "../view/personal_card/enterPersonalCard";
import SearchBySurname from "../view/personal_card/searchBySurname";

const PersonalCardRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/personal_card/enterPersonalCard" element={ <EnterPersonalCard />} />
            <Route path="/view/personal_card/searchBySurname" element={ <SearchBySurname />} />
        </Routes>        
    )
};

export default PersonalCardRoute;