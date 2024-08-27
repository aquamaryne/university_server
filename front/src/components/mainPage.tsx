import React from "react";
import Witness from "./witness";
import PersonalCard from "./personal_card";
import Print from "./print";
import Statistic from "./statisctic";
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
                justifyContent: 'center', 
                padding: "1%",
                gap: '0.5%',
                border: 2,
                borderStyle: 'solid',
                borderRight: 'none',
                borderLeft: 'none',
                borderTop: 'none',
            }}> 
                <Witness />
                <PersonalCard />
                <Print />
                <Statistic />
                <Form />
                <Archieve />
            </div>
        </div>
    )
}

export default MainPage;