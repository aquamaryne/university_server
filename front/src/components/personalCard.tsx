import * as React from 'react';
import { useParams } from 'react-router-dom';

const PersonalCard: React.FC = () => {
    const { id } = useParams(); 
    return(
        <div>
            <h1>Страница деталей: {id} </h1>
            {/**/}
        </div>
    )
};

export default PersonalCard;