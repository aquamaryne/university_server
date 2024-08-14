import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
            const responce = await axios.post('http://localhost:3001/auth', { password });
            if(responce.status === 200){
                const token = responce.data.access_token;
                localStorage.setItem('token', token);
                alert(responce.data.message);
                navigate('/mainPage');
            } else {
                alert('Log failed');
            }
        } catch(error: any){
            alert("Log failed");
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
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        style={{ marginTop: '16px' }}
                    >
                        Увійти
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;