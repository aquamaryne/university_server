import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorizations = () => {
    const [key, setKey] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAuthorization = async() => {
        try{
            const responce = await axios.post('http//localhost:3001/login', { key });
            setMessage(responce.data.message);
            navigate('/mainPage');
        } catch(error){
            setMessage('Authorization failed');
        }
    };

    return(
        <div>
            <input
                type='text'
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder='Enter key'
            />
            <button onClick={handleAuthorization}>Enter</button>
            <p>{message}</p>
        </div>
    );
};

export default Authorizations;