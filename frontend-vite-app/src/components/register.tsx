import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/authContext';
import { Loader2 } from 'lucide-react';


const Register: React.FC = () => {
    const [authKey, setAuthKey] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthKey(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try{
            const responce = await axios.post<{ message: string }>(
                'http://localhost:3001/auth-key/validate',
                { auth_key: authKey },
                {
                    withCredentials: true,
                }
            );

            if(responce.status === 201){
                setMessage(responce.data.message);
                login();
                navigate('/mainPage');
            }
        } catch (error: any){
            if(axios.isAxiosError(error)){
                setMessage(error.response?.data.message || 'Сталася несподівана помилка.');
            } else {
                setMessage('Сталася несподівана помилка.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-slate-50'>
            <div className='w-full max-w-md px-4'>
                <Card className='border-2 shadow-lg border-black rounded-none'>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-2xl font-bold text-center'>Авторизація</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className='grid gap-4'>
                                <div className='grid gap-2'>
                                    <Label htmlFor='auth-key'>Ключ авторизації</Label>
                                    <Input 
                                        id='auth-key'
                                        type='password'
                                        placeholder='Введіть ключ'
                                        value={authKey}
                                        onChange={handleInputChange}
                                        className='border-blue-300 focus:border-blue-500 rounded-none'
                                        autoComplete='off'
                                    />
                                </div>
                                {message && (
                                    <Alert variant="destructive" className='py-2 rounded-none border-red-600'>
                                        <AlertDescription>{message}</AlertDescription>
                                    </Alert>
                                )}
                                <Button
                                    type='submit'
                                    className='w-full bg-blue-500 hover:bg-blue-700 rounded-none cursor-pointer'
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Завантаження
                                        </>
                                    ): (
                                        'Увійти'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default Register;
