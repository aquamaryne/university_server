import React from "react";
import { Box, Button, Typography, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface Facultys {
    id: number;
    department_name: string;
};

const Faculty: React.FC = () => {
    const [department, setDepartment] = React.useState<Facultys[]>([]);
    React.useEffect(() => {
        const fetchDepart = async() => {
            try{
                const responce = await fetch('http://localhost:3001/department');
                if(!responce.ok){
                    throw new Error('Network not ok');
                }
                const data: Facultys[] = await responce.json();
                setDepartment(data);
            } catch(error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchDepart();
    }, [])

    return(
        <Box sx={{ width: '100%', margin: '0 auto', padding: '16px', boxSizing: 'border-box' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>Довідник факультетів</Typography>
            <Box component='ul' sx={{ display: 'table', width: '100%', padding: 0, margin: 0, listStyleType: 'none', border: 1 }}>
                <Box
                    component='li'
                    sx={{
                        display: 'table-row',
                        backgroundColor: '#e0e0e0',
                    }}
                >
                    <Box
                        component='span'
                        sx={{
                            display: 'table-cell',
                            padding: '8px',
                            border: '1px solid',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Код
                    </Box>
                    <Box
                        component='span'
                        sx={{
                            display: 'table-cell',
                            padding: '8px',
                            border: '1px solid',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Назва
                    </Box>
                </Box>
                { department.map(dept => (
                    <Box
                        component='li'
                        key={dept.id}
                        sx={{
                            display: 'table-row',
                            '&:nth-of-type(odd)':{
                                backgroundColor: '#f2f2f2',
                            },
                        }}
                    >
                        <Box
                            component='span'
                            sx={{
                                display: 'table-cell',
                                padding: '8px',
                                border: '1px solid',
                            }}
                        >
                            <Typography variant="h6">{ dept.id }</Typography>
                        </Box>
                        <Box
                            component='span'
                            sx={{
                                display: 'grid',
                                padding: '8px',
                                border: '1px solid',
                                verticalAlign: 'top',
                                alignItems: 'center',
                                gridTemplateColumns: '1fr auto',
            
                            }}
                        >
                            <Typography variant="h6">{ dept.department_name }</Typography>
                         </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Faculty;