import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Container, CircularProgress } from "@mui/material";

const PersonalCard: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const [staffMember, setStaffMember] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    
    React.useEffect(() => {
        const fetchStaffMember = async() => {
            try{
                const responce = await fetch(`http://localhost:3001/employeers/:${id}`);
                if(!responce.ok){
                    throw new Error('Не знайдено');
                }
                const data = await responce.json();
                setStaffMember(data);
            } catch(err: any){
                setError(err.message);
            } finally {
                setLoading(true);
            }
        };

        fetchStaffMember();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ marginTop: "2rem", textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h4' component="div" gutterBottom>
                        Сторінка персонала
                    </Typography>
                    <Typography variant='body1' paragraph>
                        <strong>Фамилия:</strong> {staffMember.surname}
                    </Typography>
                    <Typography variant='body1' paragraph>
                        <strong>Имя:</strong> {staffMember.name}
                    </Typography>
                    <Typography variant='body1' paragraph>
                        <strong>Должность:</strong> {staffMember.position}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PersonalCard;