// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Checkbox,
//   Select,
//   MenuItem,
//   InputLabel,
//   SelectChangeEvent
// } from '@mui/material';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs, { Dayjs } from 'dayjs';

// interface FormData {
//   personalCardNumber: string;
//   surname: string;
//   name: string;
//   patronymic: string;
//   birthYear: string;
//   gender: string;
//   academicTitleCandidate: boolean;
//   academicTitleDoctor: boolean;
//   academicTitleAcademician: boolean;
//   academicTitleSumisnyk: boolean;
//   subdivision: string;
//   position: string;
//   entryMonth: string;
//   entryYear: string;
//   education: string;
//   fromWhereMoved: string;
//   employmentContract: string;
//   contractTerm: string;
//   academicDegree: string;
//   academicRank: string;
//   honoraryTitle: string;
//   zaslVPSH: string;
//   govAwards: string;
//   zaslDiiachNauky: string;
//   otherHonors: string;
//   academician: string;
//   memberCorrespondent: string;
//   totalAcademicExperience: string;
//   instituteAcademicExperience: string;
//   discipline: string;
//   foreignLanguages: string;
//   lastQualificationYear: string;
//   workMode: string;
// }

// const initialFormData: FormData = {
//   personalCardNumber: '',
//   surname: '',
//   name: '',
//   patronymic: '',
//   birthYear: '',
//   gender: '',
//   academicTitleCandidate: false,
//   academicTitleDoctor: false,
//   academicTitleAcademician: false,
//   academicTitleSumisnyk: false,
//   subdivision: '',
//   position: '',
//   entryMonth: '',
//   entryYear: '',
//   education: '',
//   fromWhereMoved: '',
//   employmentContract: '',
//   contractTerm: '',
//   academicDegree: '',
//   academicRank: '',
//   honoraryTitle: '',
//   zaslVPSH: '',
//   govAwards: '',
//   zaslDiiachNauky: '',
//   otherHonors: '',
//   academician: '',
//   memberCorrespondent: '',
//   totalAcademicExperience: '',
//   instituteAcademicExperience: '',
//   discipline: '',
//   foreignLanguages: '',
//   lastQualificationYear: '',
//   workMode: '',
// };

// const IdenticalForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>(initialFormData);

//   // День и время храним как Dayjs
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name as string]: value });
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setFormData({ ...formData, [name]: checked });
//   };

//   const handleSubmit = () => {
//     console.log('Form Data:', formData);
//     console.log('Selected Date:', selectedDate?.format('DD.MM.YYYY'));
//   };

//   const handleSelectChange = (
//     event: SelectChangeEvent<string>
//   ) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       {/* Общий контейнер без фиксированной ширины */}
//       <Box sx={{ p: 2 }}>
//         <Grid container spacing={2}>
//           {/* Шапка (первый ряд) */}
//           <Grid item xs={12} container spacing={2} alignItems="center">
//             <Grid item xs={6} sm={4}>
//               <Typography variant="h6">Введіть дані :</Typography>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <InputLabel id="subdivision-label">Виберіть підрозділ</InputLabel>
//                 <Select
//                   labelId="subdivision-label"
//                   name="subdivision"
//                   label="Виберіть підрозділ"
//                   value={formData.subdivision}
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="">
//                     <em>Не вибрано</em>
//                   </MenuItem>
//                   <MenuItem value="Кафедра 1">Кафедра 1</MenuItem>
//                   <MenuItem value="Кафедра 2">Кафедра 2</MenuItem>
//                   <MenuItem value="Кафедра 3">Кафедра 3</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             {/* Календарь "На дату" */}
//             <Grid item xs={12} sm={12} md={2}>
//               <DatePicker
//                 label="На дату"
//                 value={selectedDate}
//                 onChange={(newValue) => {
//                   setSelectedDate(newValue);
//                 }}
//                 slotProps={{ textField: { fullWidth: true } }}
//               />
//             </Grid>
//           </Grid>

//           {/* Остальная часть формы (каждое поле в своем Grid item) */}
//           <Grid item xs={12} container spacing={2}>
//             {/* Особова картка № */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Особова картка №"
//                 name="personalCardNumber"
//                 value={formData.personalCardNumber}
//               />
//             </Grid>

//             {/* Прізвище */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Прізвище"
//                 name="surname"
//                 value={formData.surname}
//               />
//             </Grid>

//             {/* Ім'я */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Ім'я"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* По батькові */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="По батькові"
//                 name="patronymic"
//                 value={formData.patronymic}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Рік народження */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Рік народження"
//                 name="birthYear"
//                 value={formData.birthYear}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Стать (радио-группа) */}
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl component="fieldset" fullWidth>
//                 <FormLabel component="legend">Стать</FormLabel>
//                 <RadioGroup
//                   row
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel value="ч" control={<Radio />} label="Ч" />
//                   <FormControlLabel value="ж" control={<Radio />} label="Ж" />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>

//             {/* Кандидат, Доктор, Академік, Сумісник (чекбоксы) */}
//             <Grid item xs={12} sm={12} md={6}>
//               <FormLabel component="legend" sx={{ mb: 1 }}>
//                 Статуси
//               </FormLabel>
//               <Box>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="academicTitleCandidate"
//                       checked={formData.academicTitleCandidate}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label="Кандидат"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="academicTitleDoctor"
//                       checked={formData.academicTitleDoctor}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label="Доктор"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="academicTitleAcademician"
//                       checked={formData.academicTitleAcademician}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label="Академік"
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="academicTitleSumisnyk"
//                       checked={formData.academicTitleSumisnyk}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label="Сумісник"
//                 />
//               </Box>
//             </Grid>

//             {/* Посада */}
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel id="position-label">Посада</InputLabel>
//                 <Select
//                   labelId="position-label"
//                   label="Посада"
//                   name="position"
//                   value={formData.position}
//                 >
//                   <MenuItem value="">—</MenuItem>
//                   <MenuItem value="Професор">Професор</MenuItem>
//                   <MenuItem value="Доцент">Доцент</MenuItem>
//                   <MenuItem value="Асистент">Асистент</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Дата вступу на посаду: Місяць / Рік */}
//             <Grid item xs={12} sm={3} md={2}>
//               <TextField
//                 fullWidth
//                 label="Місяць"
//                 name="entryMonth"
//                 value={formData.entryMonth}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3} md={2}>
//               <TextField
//                 fullWidth
//                 label="Рік"
//                 name="entryYear"
//                 value={formData.entryYear}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Режим роботи */}
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel id="work-mode-label">Режим роботи</InputLabel>
//                 <Select
//                   labelId="work-mode-label"
//                   name="workMode"
//                   label="Режим роботи"
//                   value={formData.workMode}
//                 >
//                   <MenuItem value="">—</MenuItem>
//                   <MenuItem value="Повна зайнятість">Повна зайнятість</MenuItem>
//                   <MenuItem value="Часткова зайнятість">Часткова зайнятість</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Освіта (що/коли закінчив) */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Освіта (що/коли закінчив)"
//                 name="education"
//                 value={formData.education}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Звідки перейшов */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Звідки перейшов"
//                 name="fromWhereMoved"
//                 value={formData.fromWhereMoved}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Трудовий договір */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Трудовий договір"
//                 name="employmentContract"
//                 value={formData.employmentContract}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Термін тр. угоди */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Термін тр. угоди"
//                 name="contractTerm"
//                 value={formData.contractTerm}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Вчений ступінь */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Вчений ступінь"
//                 name="academicDegree"
//                 value={formData.academicDegree}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Вчене звання */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Вчене звання"
//                 name="academicRank"
//                 value={formData.academicRank}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Почесне звання */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Почесне звання"
//                 name="honoraryTitle"
//                 value={formData.honoraryTitle}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Засл.праців. ВШ */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Засл.праців. ВШ"
//                 name="zaslVPSH"
//                 value={formData.zaslVPSH}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Державні премії */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Державні премії"
//                 name="govAwards"
//                 value={formData.govAwards}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Засл.діяч науки */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Засл.діяч науки"
//                 name="zaslDiiachNauky"
//                 value={formData.zaslDiiachNauky}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Інші відзнаки */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Інші відзнаки"
//                 name="otherHonors"
//                 value={formData.otherHonors}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Академік */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Академік"
//                 name="academician"
//                 value={formData.academician}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Член.-кор. */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Член.-кор."
//                 name="memberCorrespondent"
//                 value={formData.memberCorrespondent}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Загальний наук.-пед. стаж */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Загальний наук.-пед. стаж (років)"
//                 name="totalAcademicExperience"
//                 value={formData.totalAcademicExperience}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Наук.-пед.стаж в інституті */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Наук.-пед.стаж в інституті"
//                 name="instituteAcademicExperience"
//                 value={formData.instituteAcademicExperience}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Дисципліна, яку викладає */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Дисципліна, яку викладає"
//                 name="discipline"
//                 value={formData.discipline}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Рік ост.підвищ.кваліф. */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Рік ост.підвищ.кваліф."
//                 name="lastQualificationYear"
//                 value={formData.lastQualificationYear}
//                 onChange={handleChange}
//               />
//             </Grid>

//             {/* Іноземні мови */}
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Іноземні мови"
//                 name="foreignLanguages"
//                 value={formData.foreignLanguages}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           {/* Кнопка в отдельной строке */}
//           <Grid item xs={12}>
//             <Button variant="contained" onClick={handleSubmit}>
//               Зберегти
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default IdenticalForm;
