// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const PageButton: React.FC = () => {
//     const navigate = useNavigate();

//     return(
//         <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between",
//             }}>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate(-1)}
//                 sx={{
//                     borderRadius: 0,
//                     backgroundColor: "white",
//                     border: "2px solid",
//                     borderColor: "#1976d2",
//                     marginRight: "2%",
//                 }}
//             >
//                 <ArrowBackIosNewIcon 
//                     sx={{
//                         color: "#1976d2",
//                     }}
//                 />
//             </Button>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate(1)}
//                 sx={{
//                     borderRadius: 0,
//                     backgroundColor: "white",
//                     border: "2px solid",
//                     borderColor: "#1976d2",
//                     marginLeft: "2px"
//                 }}
//             >
//                 <ArrowForwardIosIcon 
//                     sx={{
//                         color: "#1976d2",
//                     }}
//                 />
//             </Button>
//         </div>
//     )
// }

// export default PageButton;