import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Container, CircularProgress, Button, TextField } from "@mui/material";

const PersonalCard: React.FC = () => {
    const { id, unique } = useParams<{ id: string, unique: string }>(); 
    const [staffMember, setStaffMember] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [unique_card, setUniqueCard] = React.useState<string>('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchStaffMember = async() => {
            setLoading(true);
            try{
                const url = id 
                ? `http://localhost:3001/employeers/${id}` 
                : `http://localhost:3001/employeers/unique/${unique}`;

                const responce = await fetch(url);
                if(!responce.ok) throw new Error(`Not found ${responce.statusText}`);

                const data = await responce.json();
                setStaffMember(data);
                setError(null);
            } catch(err: any){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if(id || unique) {
            fetchStaffMember();
        } else {
            setLoading(false);
        }
    }, [id, unique_card]);

    const handleFetchByUniqueCard = () => {
        if(unique_card){
            navigate(`/view/personal_card/personalCard/unique/${unique_card}`);
        }
    }

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ marginTop: "2rem", textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!id && !unique) {
        return (
            <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            Пошук співробітника за унікальним номером карти
                        </Typography>
                        <TextField
                            label="Унікальний номер картки"
                            value={unique_card}
                            onChange={(e) => setUniqueCard(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFetchByUniqueCard}
                            disabled={!unique_card}
                        >
                            Пошук
                        </Button>
                        {error && (
                            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        Сторінка персонала
                    </Typography>
                    {staffMember ? (
                        <>
                            <Typography variant="body1" paragraph>
                                <strong>Номер картки:</strong> {staffMember.unique_card || 'Нет данных'}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>Прізвище:</strong> {staffMember.sname || 'Нет данных'}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>Ім'я:</strong> {staffMember.fname || 'Нет данных'}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                <strong>По батькові:</strong> {staffMember.fatherly || 'Нет данных'}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body2" color="error">
                            Дані не знайдено
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default PersonalCard;