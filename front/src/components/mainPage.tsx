import React from "react";
import Witness from "./witness";
import Personal_Card from "./personal_card";
import Print from "./print";
import Statistic from "./statisctic";
import Witness_Print from "./witness_print";
import Form from "./form";
import Archieve from "./archieve";

const MainPage: React.FC = () => {
    return(
        <nav>
            <ul>
                <div>
                    <Witness />
                </div>
                <div>
                    <Personal_Card />
                </div>
                <div>
                    <Print />
                </div>
                <div>
                    <Statistic />
                </div>
                <div>
                    <Witness_Print />
                </div>
                <div>
                    <Form />
                </div>
                <div>
                    <Archieve />
                </div>
            </ul>
        </nav>
    )
}

export default MainPage;