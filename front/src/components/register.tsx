import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, CircularProgress  } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async() => {
        setLoading(true);
        setError(null);

        try{
            const responce = await axios.post('http://localhost:3001/auth/login', { password });
            if(responce.status === 200){
                const token = responce.data.access_token;
                localStorage.setItem('token', token);
                alert(responce.data.message);
                navigate('/mainPage');
            } else {
                alert('Login failed');
            }
        } catch(error: any){
            setError('Login failed.')
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