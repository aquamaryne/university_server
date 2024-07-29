import React from "react";
import { Box, Typography } from '@mui/material';

interface Languages{
    id: number;
    language_name: string;
};


const Language: React.FC = () => {
    const[language,setLanguage] = React.useState<Languages[]>([]);
    React.useEffect(() => {
        const fetchLang = async() => {
            try{
                const responce = await fetch('http://localhost:3001/lang');
                if(!responce.ok){
                    throw new Error('Bad network');
                }
                const data: Languages[] = await responce.json();
                setLanguage(data);
            } catch(error){
                console.error('Error fetching data', error);
            }
        };
        fetchLang();
    }, []);

    return(
        <Box sx={{ width: '100%', margin: '0 auto', padding: '16px', boxSizing: 'border-box' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>Довідник іноземних мов</Typography>
            <Box component='ul' sx={{ display: 'table', width: '100%', padding: 0, margin: 0, listStyleType: 'none', border: 1 }}>
                <Box
                    component="li"
                    sx={{
                        display: "table-row",
                        backgroundColor: "e0e0e0"
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
                            backgroundColor: 'ThreeDHighlight'
                        }}
                    >
                        Назва
                    </Box>
                </Box>
                    { language.map(lang => (
                        <Box
                            component="li"
                            key={lang.language_name}
                            sx={{
                                display: 'table-row',
                                '&:nth-of-type(odd)': {
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
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h6">{lang.language_name}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
    )
}

export default Language;