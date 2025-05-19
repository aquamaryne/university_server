// import React from "react";
// import { Box, Typography } from '@mui/material';

// interface Domains {
//     id: number;
//     domain_name: string;
// };


// const Domain: React.FC = () => {
//     const [domain, setDomain] = React.useState<Domains[]>([]);
//     React.useEffect(() => {
//         const fetchDepart = async() => {
//             const localhost = `http://localhost:3001/domains`;

//             try{
//                 const responce = await fetch(`${localhost}`);
//                 if(!responce.ok){
//                     throw new Error('Network not ok');
//                 }
//                 const data: Domains[] = await responce.json();
//                 setDomain(data);
//             } catch(error) {
//                 console.error('Error fetching data: ', error);
//             }
//         };

//         fetchDepart();
//     }, [])

//     return(
//         <Box sx={{ width: '100%', margin: '0 auto', padding: '16px', boxSizing: 'border-box' }}>
//             <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>Довідник підрозділів</Typography>
//             <Box component='ul' sx={{ display: 'table', width: '100%', padding: 0, margin: 0, listStyleType: 'none', border: 1 }}>
//                 <Box
//                     component='li'
//                     sx={{
//                         display: 'table-row',
//                         backgroundColor: '#e0e0e0',
//                     }}
//                 >
//                     <Box
//                         component='span'
//                         sx={{
//                             display: 'table-cell',
//                             padding: '8px',
//                             border: '1px solid',
//                             textAlign: 'center',
//                             fontWeight: 'bold',
//                         }}
//                     >
//                         Код
//                     </Box>
//                     <Box
//                         component='span'
//                         sx={{
//                             display: 'table-cell',
//                             padding: '8px',
//                             border: '1px solid',
//                             textAlign: 'center',
//                             fontWeight: 'bold',
//                         }}
//                     >
//                         Назва
//                     </Box>
//                 </Box>
//                 { domain.map(dom => (
//                     <Box
//                         component='li'
//                         key={dom.id}
//                         sx={{
//                             display: 'table-row',
//                             '&:nth-of-type(odd)':{
//                                 backgroundColor: '#f2f2f2',
//                             },
//                         }}
//                     >
//                         <Box
//                             component='span'
//                             sx={{
//                                 display: 'table-cell',
//                                 padding: '8px',
//                                 border: '1px solid',
//                             }}
//                         >
//                             <Typography variant="h6">{ dom.id }</Typography>
//                         </Box>
//                         <Box
//                             component='span'
//                             sx={{
//                                 display: 'grid',
//                                 padding: '8px',
//                                 border: '1px solid',
//                                 verticalAlign: 'top',
//                                 alignItems: 'center',
//                                 gridTemplateColumns: '1fr auto',
            
//                             }}
//                         >
//                             <Typography variant="h6">{ dom.domain_name }</Typography>
//                          </Box>
//                     </Box>
//                 ))}
//             </Box>
//         </Box>
//     )
// }

// export default Domain;