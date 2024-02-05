import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { fontFamily } from '@mui/system';

const Authorizations = () => {
    const [key, setKey] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAuthorization = async() => {
        try{
            const responce = await axios.post('http//localhost:3001/login', { key });
            setMessage(responce.data.message);

            //fix
            navigate('/mainPage');
        } catch(error){
            setMessage('Authorization failed');
        }
    };

    return(
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderColor: '',
                    justifyContent: 'center',
                    minHeight: '70vH',
                    color: 'white',
                }}
                >
                    <Typography component="h1" variant="h5" sx={{ fontFamily: 'PT Sans'}}>
                        Authorization
                    </Typography>

                    {/* Fix this */}
                    <Box component="form" noValidate sx={{ mt:1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='key'
                            label='Enter Key'
                            name='key'
                            autoFocus
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            sx={{
                                fontFamily: 'PT Sans',
                                color: 'white'
                            }}
                    />

                    {/* Fix this */}
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{ 
                            mt: 3, 
                            mb: 2,  
                            fontFamily: 'PT Sans',
                            borderColor: 'green'
                        }}
                        onClick={handleAuthorization}
                    >
                        Enter
                    </Button>
                    <Typography variant='body2' color="error" align='center'>
                        {message}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Authorizations;