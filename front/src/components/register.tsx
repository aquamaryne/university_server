import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';
import { useAuth } from '../routes/authContext';


const Register: React.FC = () => {
    const [authKey, setAuthKey] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthKey(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post<{ message: string }>(
                'http://localhost:3001/auth-key', 
                { auth_key: authKey },
                {
                    withCredentials: true,
                }
            );
            
            if (response.status === 201) {
                setMessage(response.data.message);
                login();
                navigate('/mainPage')
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data.message || 'Сталася неочікувана помилка.');
            } else {
                setMessage('Сталася неочікувана помилка.');
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '90vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Box p={3} border={2} borderRadius={1} boxShadow={4}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Авторизація
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Введіть ключ"
                            type="password"
                            variant="standard" 
                            fullWidth
                            focused
                            color="warning"
                            margin="normal"
                            value={authKey}
                            onChange={handleInputChange}
                        />
                        <Box sx={{ textAlign: 'center' }}>
                            {message && <Typography color="white" align="center" variant="body1" sx={{ marginTop: 1, backgroundColor: 'red', padding: '4px 16px', display: 'inline-block', borderRadius: '4px' }}>{message}</Typography>}
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            style={{ marginTop: '16px' }}
                            disabled={loading} 
                        >
                            {loading ? <CircularProgress size={24} color="success" /> : 'Увійти'}
                        </Button>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
