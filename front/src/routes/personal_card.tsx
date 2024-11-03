import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBySurname from "../view/personal_card/searchBySurname";
import PersonalCard from "../view/personal_card/personalCard";

const PersonalCardRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/personal_card/personalCard"      element={ <PersonalCard />} />
            <Route path="/view/personal_card/personalCard/:id"  element={ <PersonalCard />} />
            <Route path="/view/personal_card/searchBySurname"   element={ <SearchBySurname />} />
        </Routes>        
    )
};

export default PersonalCardRoute;