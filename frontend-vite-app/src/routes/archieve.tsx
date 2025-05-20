import * as React from "react";
import { Routes, Route } from "react-router-dom";
import WatchCard from "../components/view/archieve/watchCard";
import ListOfFired from "../components/view/archieve/listOfFired";
import WatchAndEdit from "../components/view/archieve/watchAndEdit";

const ArchieveRoute: React.FC = () => {
    return(
        <Routes>
            <Route path="/view/archieve/watchCard"      element={ <WatchCard />} />
            <Route path="/view/archieve/listOfFired"    element={ <ListOfFired /> } />
            <Route path="/view/archieve/watchAndEdit"   element={ <WatchAndEdit /> } />
        </Routes>
    )
}

export default ArchieveRoute;