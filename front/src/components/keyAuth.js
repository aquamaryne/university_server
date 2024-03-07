import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../css/theme.css";

const Authorizations = () => {
    const [key, setKey] = useState('');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(null);
    const navigate = useNavigate();

    const handleAuthorization = async() => {
        try{
            const responce = await axios.post('http://localhost:3001/auth', { key });
            setIsValid(responce.data.isValid);
            if(!responce.data.isValid){
                setMessage(responce.data.message);
            }
            navigate('./mainPage', { replace: true })
        } catch(error){
            setMessage('Помилка авторизації');
        }
    };

    return(
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderColor: '',
                    justifyContent: 'center',
                    minHeight: '70vH',
                    color: 'white',
                }}
                >
                    <Typography component="h1" variant="h5" sx={{ fontFamily: 'PT Sans', color: '#1f1f1f'}}>
                        Авторизація
                    </Typography>

                    <Box component="form" sx={{ mt:1 }} className='box'>
                        <TextField
                            className='field'
                            margin='normal'
                            required
                            fullWidth
                            id='key'
                            label='Введіть ключ'
                            name='key'
                            value={ key }
                            onChange={(e) => setKey(e.target.value)}

                            sx={{
                                borderRadius: 1,
                                border: 2,
                                borderColor: '#46244C'
                            }}

                            InputLabelProps={{ 
                                className: 'label__textfield' 
                            }}

                            InputProps={{
                                color: "warning"
                            }}
                            variant="filled"
                        />

                    <Button
                        fullWidth
                        variant='contained'
                        sx={{ 
                            mt: 3, 
                            mb: 2,  
                            fontFamily: 'PT Sans',
                            backgroundColor: '#fdf6e3',
                            '&:hover': {
                                backgroundColor: '#eee8d5'
                            },
                            color: 'black',
                            '&:hover': {
                                boxShadow: '-3px 3px 0px 0px',
                                backgroundColor: '#2EB086',
                            },
                            borderRadius: 0,
                            border: 1,
                            borderColor: 'black'
                        }}
                        onClick={handleAuthorization}
                    >
                        Увійти
                    </Button>
                    <Typography variant='body2' color="error" align='center' sx={{ fontFamily: 'PT Sans' }}>
                        {message}
                    </Typography>
                    {isValid !== null && (
                        <Typography variant='body2' color="error" align='center' sx={{ fontFamily: 'PT Sans' }}>
                            {isValid ? 'Ваш ключ дійсний' : 'Невірний ключ'}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Authorizations;