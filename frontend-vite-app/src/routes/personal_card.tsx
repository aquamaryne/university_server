import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBySurname from "../components/view/personal_card/searchBySurname";
import PersonalCard from "../components/view/personal_card/personalCard";

const PersonalCardRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="personalCard"      element={ <PersonalCard />} />
            <Route path="personalCard/unique/:unique" element = { <PersonalCard />} />
            <Route path="personalCard/:id"  element={ <PersonalCard />} />
            <Route path="searchBySurname"   element={ <SearchBySurname />} />
        </Routes>        
    )
};

export default PersonalCardRoute;