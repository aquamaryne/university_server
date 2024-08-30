import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, CircularProgress  } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Auth{
    auth_key: string;
    message: string;
};

const Register: React.FC = () => {
    const[loading, setLoading] = useState<boolean>(false);
    const[error, setError] = useState<string | null>(null);
    const[password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async() => {
        setLoading(true);
        setError(null);

        try{
            const responce = await axios.post<Auth>('http://localhost:3001/auth-key', { auth_key: password});

            if(responce.status === 200){
                const { auth_key, message } = responce.data;

                if(auth_key){
                    localStorage.setItem('token', auth_key);
                    alert(message);
                    navigate('/mainPage');
                } else {
                    alert('Login failed: No token received');
                }
            } else {
                alert('Login failed: Unexpected status code.')
            }
        } catch(error: any){
            console.error('Error during login: ', error);
            if(axios.isAxiosError(error) && error.response){
                const { message, statusCode } = error.response.data;
                setError(`Error ${statusCode}: ${message}`);
            } else {
                setError('login Failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '90vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Box p={3} border={2} borderRadius={1} boxShadow={4}>
                    <Typography variant="h4" gutterBottom textAlign={'center'}>
                        Авторизація
                    </Typography>
                    <TextField
                        label="Введіть ключ"
                        type="password"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    { error && <Typography color="error" align='center'>{error}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        disabled={loading}
                        style={{ marginTop: '16px' }}
                    >
                        { loading ? <CircularProgress  size={24} color='inherit' />: 'Увійти' }
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;