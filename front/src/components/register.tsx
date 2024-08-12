import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';

const Register: React.FC = () => {
    const [password, setPassword] = useState<string>('');

    const handleRegister = () => {
        console.log('Registering:', { password });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Box p={3} border={1} borderRadius={2} boxShadow={3}>
                    <Typography variant="h4" gutterBottom>
                        Register
                    </Typography>
                    <TextField
                        label="Password"
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
                        onClick={handleRegister}
                        style={{ marginTop: '16px' }}
                    >
                        Register
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;