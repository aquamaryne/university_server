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
        <div style={{
            padding: 5,
            margin: 5,
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                backgroundColor: 'white',
                justifyContent: 'center', 
                padding: "1%",
                gap: '1rem',
                borderRadius: 10,
            }}> 
                <Witness />
                <Personal_Card />
                <Print />
                <Statistic />
                <Witness_Print />
                <Form />
                <Archieve />
            </div>
        </div>
    )
}

export default MainPage;