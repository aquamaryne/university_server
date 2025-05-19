// import * as React from 'react';
// import { 
//   Box, 
//   Paper, 
//   Typography, 
//   TextField, 
//   MenuItem, 
//   Button, 
//   Grid, 
//   Container,
//   FormControl,
//   InputLabel,
//   Select,
//   SelectChangeEvent,
//   Checkbox,
//   FormControlLabel,
//   TableContainer,
//   Table,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableBody,
//   FormGroup,
// } from '@mui/material';

// // Define types for our form data (exactly the same as original)
// interface EmployeeData {
//   identificationCode: string;
//   taxNumber: string;
//   insuranceNumber: string;
//   personalCardNumber: string;
//   lastName: string;
//   firstName: string;
//   patronymic: string;
//   birthDate: Date | null;
//   birthPlace: string;
//   education: string;
//   educationInstitution: string;
//   graduationYear: string;
//   educationType: string;
//   department: string;
//   position: string;
//   startDate: Date | null;
//   contractEndDate: Date | null;
//   contractType: string;
//   gender: string;
//   workingSince: string;
//   specialization: string;
//   qualification: string;
//   diplomaNumber: string;
//   diplomaDate: Date | null;
//   totalExperience: string;
//   continuousExperience: string;
//   hiringDate: Date | null;
//   hiringOrderNumber: string;
//   hiringOrderDate: Date | null;
//   lastWorkplace: string;
//   terminationDate: Date | null;
//   terminationReason: string;
// }

// const EmployeeForm: React.FC = () => {
//   // State for form fields
//   const [employeeData, setEmployeeData] = React.useState<EmployeeData>({
//     identificationCode: '',
//     taxNumber: '',
//     insuranceNumber: '',
//     personalCardNumber: '',
//     lastName: '',
//     firstName: '',
//     patronymic: '',
//     birthDate: null,
//     birthPlace: '',
//     education: 'higher',
//     educationInstitution: '',
//     graduationYear: '',
//     educationType: 'full-time',
//     department: '',
//     position: '',
//     startDate: null,
//     contractEndDate: null,
//     contractType: 'contract',
//     gender: 'female',
//     workingSince: '',
//     specialization: '',
//     qualification: '',
//     diplomaNumber: '',
//     diplomaDate: null,
//     totalExperience: '',
//     continuousExperience: '',
//     hiringDate: null,
//     hiringOrderNumber: '',
//     hiringOrderDate: null,
//     lastWorkplace: '',
//     terminationDate: null,
//     terminationReason: ''
//   });

//   const [checkboxes, setCheckboxes] = React.useState({
//     fullTime: true,
//     partTime25: false,
//     partTime50: false,
//     partTime75: false,
//     coWorker: false,
//     externalCoWorker: false,
//     temporaryWorker: false,
//     postalPaidTeacher: false,
//     scientificCandidate: false,
//     scientificDoctor: true,
//     academician: false,
//     chernobyl1: false,
//     chernobyl2: false,
//     chernobyl3: false,
//     chernobyl4: false,
//     disability1: false,
//     disability2: false,
//     disability3: false
//   });

//   const[activeTab, setActiveTab] = React.useState<string>("Загальні відомості");
//   const [scientificDegree, setScientificDegree] = React.useState('008');

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCheckboxes({
//       ...checkboxes,
//       [event.target.name]: event.target.checked
//     });
//   }

//   const handleSelectChange = (event: SelectChangeEvent) => {
//     setScientificDegree(event.target.value);
//   }
//   // Handle text field changes
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>): void => {
//     const { name, value } = event.target;
//     setEmployeeData({
//       ...employeeData,
//       [name]: value
//     });
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   }

//   // Education options
//   const educationOptions = [
//     { value: 'higher', label: 'Вища' },
//     { value: 'secondary', label: 'Середня' },
//     { value: 'vocational', label: 'Професійно-технічна' }
//   ];

//   // Education type options
//   const educationTypeOptions = [
//     { value: 'full-time', label: 'Денний' },
//     { value: 'part-time', label: 'Заочний' },
//     { value: 'evening', label: 'Вечірній' }
//   ];

//   // Contract type options
//   const contractTypeOptions = [
//     { value: 'contract', label: 'Контракт' },
//     { value: 'permanent', label: 'Постійний' },
//     { value: 'temporary', label: 'Тимчасовий' }
//   ];

//   // Termination reason options
//   const terminationReasonOptions = [
//     { value: 'voluntary', label: 'За власним бажанням, ст.38 КЗпП України' },
//     { value: 'agreement', label: 'За згодою сторін' },
//     { value: 'contract-end', label: 'Закінчення строку контракту' }
//   ];

//   const tabs = [
//     'Загальні відомості', 
//     'Загальні відомості-2', 
//     'Призначення і переведення', 
//     'Відпустки', 
//     'Додат. відомості'
//   ]

//   return (
//     <Container maxWidth="xl" sx={{ py: 2 }}>
//       <Paper elevation={3} sx={{ p: 2 }}>
//         {/* Form Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Особова картка працівника</Typography>
//           <Typography variant="caption">Форма № П-2</Typography>
//         </Box>

//         {/* Tab-like Buttons */}
//         <Box sx={{ 
//           display: 'flex', 
//           flexWrap: 'wrap', 
//           gap: 1, 
//           borderBottom: 1, 
//           borderColor: 'divider', 
//           mb: 2, 
//           pb: 1 
//         }}>
//           {tabs.map((tab) => (
//             <Button 
//               key={tab} 
//               variant={activeTab === tab ? "outlined" : "contained"}
//               size="small"
//               onClick={() => handleTabChange(tab)}
//               sx={{ 
//                 textTransform: 'none',
//                 borderRadius: 0
//               }}
//             >
//               {tab}
//             </Button>
//           ))}
//         </Box>
//         {activeTab === 'Загальні відомості' && (
//           <Grid container spacing={2}>
//             {/* Left Column */}
//             <Grid item xs={12} md={6}>
//               {/* Identification Codes */}
//               <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
//                 <TextField 
//                   label="Ідентифікаційний код"
//                   name="identificationCode"
//                   value={employeeData.identificationCode}
//                   onChange={handleChange}
//                   size="small" 
//                   fullWidth 
//                 />
//                 <TextField 
//                   label="Таб №"
//                   name="taxNumber"
//                   value={employeeData.taxNumber}
//                   onChange={handleChange}
//                   size="small" 
//                   sx={{ width: 100 }} 
//                 />
//               </Box>

//               {/* Insurance and Personal Card Numbers */}
//               <TextField 
//                 label="Страхове свідоцтво №"
//                 name="insuranceNumber"
//                 value={employeeData.insuranceNumber}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               <TextField 
//                 label="Особова картка №"
//                 name="personalCardNumber"
//                 value={employeeData.personalCardNumber}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               {/* Personal Information */}
//               <TextField 
//                 label="1. Прізвище"
//                 name="lastName"
//                 value={employeeData.lastName}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               <TextField 
//                 label="Ім'я"
//                 name="firstName"
//                 value={employeeData.firstName}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               <TextField 
//                 label="По батькові"
//                 name="patronymic"
//                 value={employeeData.patronymic}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               {/* Birth Date */}
//               <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
//                 <TextField 
//                   label="2. Рік народження"
//                   name="birthYear"
//                   size="small" 
//                   sx={{ width: 100 }} 
//                 />
//                 <TextField 
//                   label="Місяць"
//                   name="birthMonth"
//                   size="small" 
//                   sx={{ width: 100 }} 
//                 />
//                 <TextField 
//                   label="Число"
//                   name="birthDay"
//                   size="small" 
//                   sx={{ width: 100 }} 
//                 />
//               </Box>

//               {/* Birth Place */}
//               <TextField 
//                 label="3. Місце народження"
//                 name="birthPlace"
//                 value={employeeData.birthPlace}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               {/* Education Section */}
//               <Box sx={{ mb: 1 }}>
//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>4. Освіта</Typography>
                
//                 <FormControl fullWidth size="small" sx={{ mb: 1 }}>
//                   <InputLabel>а) Рівень освіти</InputLabel>
//                   <Select
//                     name="education"
//                     value={employeeData.education}
//                     label="а) Рівень освіти"
//                     onChange={handleChange}
//                   >
//                     {educationOptions.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <TextField 
//                   label="б) Назва і дата закінчення ВУЗу"
//                   name="educationInstitution"
//                   value={employeeData.educationInstitution}
//                   onChange={handleChange}
//                   size="small" 
//                   fullWidth 
//                   sx={{ mb: 1 }}
//                 />

//                 <TextField 
//                   label="в) Назва і дата закінчення ПТУ"
//                   name="vocationalSchool"
//                   size="small" 
//                   fullWidth 
//                   sx={{ mb: 1 }}
//                 />

//                 <FormControl fullWidth size="small">
//                   <InputLabel>г) Вид навчання</InputLabel>
//                   <Select
//                     name="educationType"
//                     value={employeeData.educationType}
//                     label="г) Вид навчання"
//                     onChange={handleChange}
//                   >
//                     {educationTypeOptions.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>

//               {/* Department and Position */}
//               <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
//                 <FormControl size="small" sx={{ width: 120 }}>
//                   <InputLabel>Підрозділ</InputLabel>
//                   <Select
//                     name="department"
//                     value={employeeData.department}
//                     label="Підрозділ"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="08">08</MenuItem>
//                     <MenuItem value="01">01</MenuItem>
//                     <MenuItem value="02">02</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <FormControl size="small" sx={{ flexGrow: 1 }}>
//                   <InputLabel>Посада</InputLabel>
//                   <Select
//                     name="position"
//                     value={employeeData.position}
//                     label="Посада"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="senior_lecturer">Старший викладач</MenuItem>
//                     <MenuItem value="lecturer">Викладач</MenuItem>
//                     <MenuItem value="assistant">Асистент</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             </Grid>

//             {/* Right Column */}
//             <Grid item xs={12} md={6}>
//               {/* Gender and Working Since */}
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                 <Typography variant="body2">Стать</Typography>
//                 <FormControlLabel 
//                   control={
//                     <Checkbox />
//                   }
//                   label="Чоловічий"
//                 />
//                 <FormControlLabel 
//                   control={
//                     <Checkbox />
//                   }
//                   label="Жіночий"
//                 />
//                 <TextField 
//                   label="В інституті працює з"
//                   name="workingSince"
//                   value={employeeData.workingSince}
//                   onChange={handleChange}
//                   size="small" 
//                   sx={{ ml: 2, width: 100 }}
//                 />
//                 <Typography variant="body2">року</Typography>
//               </Box>

//               {/* Specialization and Qualification */}
//               <TextField 
//                 label="5. Спеціальність за дипломом"
//                 name="specialization"
//                 value={employeeData.specialization}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               <TextField 
//                 label="6. Кваліфікація за дипломом"
//                 name="qualification"
//                 value={employeeData.qualification}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               {/* Diploma Details */}
//               <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
//                 <TextField 
//                   label="Диплом №"
//                   name="diplomaNumber"
//                   value={employeeData.diplomaNumber}
//                   onChange={handleChange}
//                   size="small" 
//                   sx={{ flexGrow: 1 }} 
//                 />
//                 <TextField 
//                   label="Дата"
//                   name="diplomaDate"
//                   placeholder="ДД.ММ.РРРР"
//                   size="small" 
//                   sx={{ width: 150 }} 
//                 />
//               </Box>

//               {/* Experience */}
//               <TextField 
//                 label="7. Загальний стаж роботи"
//                 name="totalExperience"
//                 value={employeeData.totalExperience}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               <Box sx={{ mb: 1 }}>
//                 <TextField 
//                   label="8. Безперервний стаж роботи"
//                   name="continuousExperience"
//                   value={employeeData.continuousExperience}
//                   onChange={handleChange}
//                   size="small" 
//                   fullWidth 
//                   sx={{ mb: 1 }}
//                 />

//                 <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
//                   <TextField 
//                     label="Дата прийому в НТУ"
//                     name="hiringDate"
//                     placeholder="ДД.ММ.РРРР"
//                     size="small" 
//                     sx={{ flexGrow: 1 }}
//                   />
//                   <TextField 
//                     label="№ наказу"
//                     name="hiringOrderNumber"
//                     value={employeeData.hiringOrderNumber}
//                     onChange={handleChange}
//                     size="small" 
//                     sx={{ width: 120 }}
//                   />
//                 </Box>

//                 <TextField 
//                   label="Дата наказу на прийом"
//                   name="hiringOrderDate"
//                   placeholder="ДД.ММ.РРРР"
//                   size="small" 
//                   fullWidth 
//                 />
//               </Box>

//               {/* Last Workplace */}
//               <TextField 
//                 label="9. Останнє місце роботи, посада, професія"
//                 name="lastWorkplace"
//                 value={employeeData.lastWorkplace}
//                 onChange={handleChange}
//                 size="small" 
//                 fullWidth 
//                 sx={{ mb: 1 }}
//               />

//               {/* Termination Details */}
//               <Box sx={{ mb: 1 }}>
//                 <TextField 
//                   label="10. Дата звільнення"
//                   name="terminationDate"
//                   placeholder="ДД.ММ.РРРР"
//                   size="small" 
//                   fullWidth 
//                   sx={{ mb: 1 }}
//                 />

//                 <FormControl fullWidth size="small">
//                   <InputLabel>Причина звільнення</InputLabel>
//                   <Select
//                     name="terminationReason"
//                     value={employeeData.terminationReason}
//                     label="Причина звільнення"
//                     onChange={handleChange}
//                   >
//                     {terminationReasonOptions.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>

//               {/* Contract Details */}
//               <Grid container spacing={1}>
//                 <Grid item xs={12} sm={5}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Трудова угода</InputLabel>
//                     <Select
//                       name="contractType"
//                       value={employeeData.contractType}
//                       label="Трудова угода"
//                       onChange={handleChange}
//                     >
//                       {contractTypeOptions.map((option) => (
//                         <MenuItem key={option.value} value={option.value}>
//                           {option.label}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={7}>
//                   <TextField 
//                     label="Термін закінч. труд угоди"
//                     name="contractEndDate"
//                     placeholder="ДД.ММ.РРРР"
//                     size="small" 
//                     fullWidth 
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         )}

//         {activeTab === 'Загальні відомості-2' && (
//           <Grid container spacing={2}>
//             <Grid item xs={12}> 
//               <Typography variant='h6' sx={{ mb: 2 }}>Додаткові відомості</Typography>
//               <Box sx = {{ mb:2 }}>
//                 <Typography variant='subtitle1'>11. Родинний стан</Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={4}>
//                     <FormControl fullWidth size='small'>
//                       <InputLabel>Члени сім'ї</InputLabel>
//                       <Select
//                         label="Члени сім'ї"
//                       >
//                         <MenuItem value="spouse">Дружина/Чоловік</MenuItem>
//                         <MenuItem value="child">Дитина</MenuItem>
//                         <MenuItem value="parent">Батько/Мати</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} sm={8}>
//                     <TextField 
//                       label="ПІБ"
//                       size='small'
//                       fullWidth
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1">12. Паспорт</Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={4}>
//                     <TextField 
//                       label="Серія"
//                       size='small'
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       label="Ким виданий"
//                       size='small'
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField 
//                       label="Дата видачі"
//                       size='small'
//                       fullWidth
//                       placeholder='ДД.ММ.РРРР'
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant='subtitle1'>13-14. Контактна інформація</Typography>
//                 <TextField 
//                   label='Домашня адреса'
//                   size='small'
//                   fullWidth
//                   sx={{ mb: 1 }}
//                 />
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label='Телефон'
//                       size='small'
//                       fullWidth 
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField 
//                       label='Мобільний телефон'
//                       size='small'
//                       fullWidth
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Grid>
//           </Grid>
//         )}

//         { activeTab === 'Призначення і переведення' && (
//           <TableContainer sx={{ border: 1, borderColor: 'divider', mb: 1, maxHeight: 400 }}>
//             <Table size='small' stickyHeader>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5'}}>
//                   <TableCell sx={{ width: 30}}>#</TableCell>
//                   <TableCell>Дата</TableCell>
//                   <TableCell>Підрозділ</TableCell>
//                   <TableCell>Посада</TableCell>
//                   <TableCell>Вид труд.договору</TableCell>
//                   <TableCell>Оклад</TableCell>
//                   <TableCell>Наказ №</TableCell>
//                   <TableCell>від</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {[...Array(5)].map((_, i) => (
//                   <TableRow key={`empty-${i}`} sx={{
//                     '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
//                     '&:hover': { backgroundColor: '#e0e0e0'}
//                   }}>
//                     <TableCell>{i + 1}</TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         { activeTab === 'Відпустки' && (
//           <TableContainer sx={{ border: 1, borderColor: 'divider', mb: 1, maxHeight: 400 }}>
//             <Table size='small' stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ backgroundColor: '#f0f0f0', width: '15%' }}>Вид</TableCell>
//                   <TableCell sx={{ backgroundColor: '#f0f0f0', width: '10%' }}>Період</TableCell>
//                   <TableCell sx={{ backgroundColor: '#f0f0f0', width: '15%' }}>Початок</TableCell>
//                   <TableCell sx={{ backgroundColor: '#f0f0f0', width: '15%' }}>Кінець</TableCell>
//                   <TableCell sx={{ backgroundColor: '#f0f0f0', width: '15%' }}>Наказ</TableCell>
//                   <TableCell sx={{ backgroundColor: '#f0f0f0', width: '15%' }}>Від</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {[...Array(15)].map((_, index) => (
//                   <TableRow key={index} sx={{ backgroundColor: '#d8f0d8' }}>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                     <TableCell></TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         { activeTab === 'Додат. відомості' && (
//           <Box sx={{ border: 1, borderColor: 'divider', p: 1 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ display: 'flex', mb: 2 }}>
//                   <FormGroup sx={{ mr: 4 }}>
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.fullTime} onChange={handleCheckboxChange} name='fullTime' />}
//                       label='Повна ставка'
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.fullTime} onChange={handleCheckboxChange} name='pathTime25' />}
//                       label='0.25 ставки'
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.fullTime} onChange={handleCheckboxChange} name='partTime50' />}
//                       label='0.50 ставки'
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.fullTime} onChange={handleCheckboxChange} name='partTime75' />}
//                       label='0.75 ставки'
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.coWorker} onChange={handleCheckboxChange} name='coWorker' />}
//                       label='Сумісник'
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.externalCoWorker} onChange={handleCheckboxChange} name='externalCoWorker' />}
//                       label='Сумісник зі сторони'
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.temporaryWorker} onChange={handleCheckboxChange} name='temporaryWorker' />}
//                       label='Працює тимчасово'
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.postalPaidTeacher} onChange={handleCheckboxChange} name='postalPaidTeacher' />}
//                       label='Викладач з почасовою оплатою'
//                     />
//                   </FormGroup>
//                 </Box>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant='body2'>Вчене звання</Typography>
//                   <TextField 
//                     size='small'
//                     fullWidth
//                     sx={{ mb: 1 }}
//                   />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 150 }}>Розширена зона</Typography>
//                   <TextField
//                     size="small"
//                     defaultValue="0.00"
//                     sx={{ width: 80 }}
//                   />
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <FormControlLabel 
//                     control={<Checkbox checked={checkboxes.scientificCandidate} onChange={handleCheckboxChange} name="scientificCandidate" />} 
//                     label="Кандидат наук" 
//                     sx={{ minWidth: 150 }}
//                   />
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     sx={{ width: 100 }}
//                   >
//                     Карта канд.
//                   </Button>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <FormControlLabel 
//                     control={<Checkbox checked={checkboxes.scientificDoctor} onChange={handleCheckboxChange} name="scientificDoctor" />} 
//                     label="Доктор наук" 
//                     sx={{ minWidth: 150 }}
//                   />
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     sx={{ width: 100 }}
//                   >
//                     Карта докт.
//                   </Button>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <FormControlLabel 
//                     control={<Checkbox checked={checkboxes.academician} onChange={handleCheckboxChange} name="academician" />} 
//                     label="Академік" 
//                     sx={{ minWidth: 150 }}
//                   />
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 150 }}>Галузь вчен.ступені:</Typography>
//                   <FormControl size="small" sx={{ width: 120 }}>
//                     <Select
//                       value={scientificDegree}
//                       onChange={handleSelectChange}
//                       displayEmpty
//                     >
//                       <MenuItem value="008">008</MenuItem>
//                       <MenuItem value="007">007</MenuItem>
//                       <MenuItem value="009">009</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 150 }}>Рік присвоєння останнього вченого звання:</Typography>
//                   <TextField
//                     size="small"
//                     defaultValue="2004"
//                     sx={{ width: 80 }}
//                   />
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 150 }}>Рік останнього підвищення кваліфікації</Typography>
//                   <TextField
//                     size="small"
//                     defaultValue="2023"
//                     sx={{ width: 80 }}
//                   />
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 150 }}>Загальний науково-педагогічний стаж</Typography>
//                   <TextField
//                     size="small"
//                     defaultValue="24"
//                     sx={{ width: 80 }}
//                   />
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 70 }}>Філія</Typography>
//                   <TextField
//                     size="small"
//                     fullWidth
//                   />
//                 </Box>
//               </Grid>

//               {/* Chernobyl section */}
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ border: 1, borderColor: 'divider', p: 1 }}>
//                   <Typography variant="body2" sx={{ mb: 1 }}>Чорнобилець:</Typography>
//                   <FormGroup sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.chernobyl1} onChange={handleCheckboxChange} name="chernobyl1" />} 
//                       label="1 кат." 
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.chernobyl2} onChange={handleCheckboxChange} name="chernobyl2" />} 
//                       label="2 кат." 
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.chernobyl3} onChange={handleCheckboxChange} name="chernobyl3" />} 
//                       label="3 кат." 
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.chernobyl4} onChange={handleCheckboxChange} name="chernobyl4" />} 
//                       label="4 кат." 
//                     />
//                   </FormGroup>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body2" sx={{ minWidth: 270 }}>№ посвідчення чорнобильця, коли і ким видане:</Typography>
//                     <TextField
//                       size="small"
//                       fullWidth
//                     />
//                   </Box>
//                 </Box>
//               </Grid>

//               {/* Disability section */}
//               <Grid item xs={12} md={6}>
//                 <Box sx={{ border: 1, borderColor: 'divider', p: 1 }}>
//                   <Typography variant="body2" sx={{ mb: 1 }}>Інвалід:</Typography>
//                   <FormGroup sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.disability1} onChange={handleCheckboxChange} name="disability1" />} 
//                       label="1 групи" 
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.disability2} onChange={handleCheckboxChange} name="disability2" />} 
//                       label="2 групи" 
//                     />
//                     <FormControlLabel 
//                       control={<Checkbox checked={checkboxes.disability3} onChange={handleCheckboxChange} name="disability3" />} 
//                       label="3 групи" 
//                     />
//                   </FormGroup>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body2" sx={{ minWidth: 200 }}>№ посвідчення, коли і ким видане:</Typography>
//                     <TextField
//                       size="small"
//                       fullWidth
//                     />
//                   </Box>
//                 </Box>
//               </Grid>

//               {/* Additional Information */}
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 120 }}>Додаткові відомості</Typography>
//                   <Box sx={{ flexGrow: 1 }}>
//                     <TextField
//                       size="small"
//                       fullWidth
//                       sx={{ mb: 1 }}
//                     />
//                     <TextField
//                       size="small"
//                       fullWidth
//                     />
//                   </Box>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                   <Typography variant="body2" sx={{ minWidth: 120 }}>Дата звільнення</Typography>
//                   <TextField
//                     size="small"
//                     sx={{ width: 120 }}
//                   />
//                   <Typography variant="body2" sx={{ ml: 2, minWidth: 120 }}>Причина звільнення</Typography>
//                   <FormControl size="small" sx={{ flexGrow: 1 }}>
//                     <Select
//                       displayEmpty
//                     >
//                       <MenuItem value="">Виберіть причину</MenuItem>
//                       <MenuItem value="voluntary">За власним бажанням</MenuItem>
//                       <MenuItem value="agreement">За згодою сторін</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <Typography variant="body2" sx={{ minWidth: 120 }}>№ наказу на звільнення</Typography>
//                   <TextField
//                     size="small"
//                     sx={{ width: 120 }}
//                   />
//                   <Typography variant="body2" sx={{ ml: 2, minWidth: 120 }}>Дата наказу на звільнення</Typography>
//                   <TextField
//                     size="small"
//                     sx={{ width: 120 }}
//                   />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         )}
        
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           gap: 2, 
//           mt: 2 
//         }}>
//           <Button 
//             variant="contained" 
//             color="error" 
//             size="small"
//           >
//             Видалити
//           </Button>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             size="small"
//           >
//             Друк 1-ї сторінки
//           </Button>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             size="small"
//           >
//             Друк 2-ї сторінки
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default EmployeeForm;