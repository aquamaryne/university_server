// import * as React from 'react';
// import { Button, Menu, MenuItem, Typography } from "@mui/material";
// import { Link } from 'react-router-dom';

// const Archieve: React.FC = () => {

//     const[anchorEl, setAnchorEl]= React.useState<null | HTMLElement>(null);

//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const hadnleClose = () => {
//         setAnchorEl(null);
//     };

//     return(
//         <div>
//             <Button
//                 sx={{
//                     border: '2px solid',
//                     borderRadius: '0px',
//                     padding: '10px 20px',
//                     backgroundColor: '#ffffff',
//                     borderColor: '#1976d2', // Синий цвет
//                     color: '#1976d2',
//                     fontSize: '16px',
//                     fontWeight: 'bold',
//                     textTransform: 'none', // Убираем заглавные буквы
//                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                     backgroundColor: '#1976d2',
//                     color: '#ffffff',
//                     transform: 'translateY(-2px)', // Лёгкий "всплывающий" эффект
//                     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//                     },
//                     '&:active': {
//                     transform: 'translateY(0)', // Убираем всплытие при нажатии
//                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                     },
//                 }}
//                 onClick={handleClick}
//                 >
//                     Архів
//                 </Button>

//             <Menu
//                 anchorEl={anchorEl}
//                 keepMounted
//                 open={Boolean(anchorEl)}
//                 onClose={hadnleClose}
//             >
//                 <MenuItem onClick={hadnleClose}>
//                     <Link to="/view/archieve/watchCard" style={{ textDecoration: 'none', color: 'black' }}>
//                         <Typography sx={{ textDecoration: 'none' }}>Перегляд картки в архіві</Typography>
//                     </Link>
//                 </MenuItem>
//                 <MenuItem onClick={hadnleClose}>
//                     <Link to="/view/archieve/listOfFired" style={{ textDecoration: 'none', color: 'black' }}>
//                         <Typography sx={{ textDecoration: 'none' }}>Списки звільнених викладачів за вказаний період</Typography>
//                     </Link>
//                 </MenuItem>
//                 <MenuItem onClick={hadnleClose}>
//                     <Link to="/view/archieve/watchAndEdit" style={{ textDecoration: 'none', color: 'black' }}>
//                         <Typography sx={{ textDecoration: 'none' }}>Перегляд і коригування номерів і дат наказів на прийом і звільнення</Typography>
//                     </Link>
//                 </MenuItem>
//             </Menu>
//         </div>
//     )
// }

// export default Archieve;