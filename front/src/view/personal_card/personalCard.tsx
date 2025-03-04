import * as React from 'react';
import { CssBaseline, Box, Paper, Typography, TextField, MenuItem, Button, Grid, Select } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

// Define types for our form data
interface EmployeeData {
  identificationCode: string;
  taxNumber: string;
  insuranceNumber: string;
  personalCardNumber: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  birthDate: Date | null;
  birthPlace: string;
  education: string;
  educationInstitution: string;
  graduationYear: string;
  educationType: string;
  department: string;
  position: string;
  startDate: Date | null;
  contractEndDate: Date | null;
  contractType: string;
  gender: string;
  workingSince: string;
  specialization: string;
  qualification: string;
  diplomaNumber: string;
  diplomaDate: Date | null;
  totalExperience: string;
  continuousExperience: string;
  hiringDate: Date | null;
  hiringOrderNumber: string;
  hiringOrderDate: Date | null;
  lastWorkplace: string;
  terminationDate: Date | null;
  terminationReason: string;
}

const EmployeeForm: React.FC = () => {
  // State for form fields
  const [employeeData, setEmployeeData] = React.useState<EmployeeData>({
    identificationCode: '',
    taxNumber: '',
    insuranceNumber: '',
    personalCardNumber: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    birthDate: null,
    birthPlace: '',
    education: 'higher',
    educationInstitution: '',
    graduationYear: '',
    educationType: 'full-time',
    department: '',
    position: '',
    startDate: null,
    contractEndDate: null,
    contractType: 'contract',
    gender: 'female',
    workingSince: '',
    specialization: '',
    qualification: '',
    diplomaNumber: '',
    diplomaDate: null,
    totalExperience: '',
    continuousExperience: '',
    hiringDate: null,
    hiringOrderNumber: '',
    hiringOrderDate: null,
    lastWorkplace: '',
    terminationDate: null,
    terminationReason: ''
  });

  // Handle text field changes with proper typing
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setEmployeeData({
      ...employeeData,
      [name]: value
    });
  };

  // Handle date changes with proper typing
  const handleDateChange = (name: string) => (date: Date | null): void => {
    setEmployeeData({
      ...employeeData,
      [name]: date
    });
  };

  // Education options
  const educationOptions = [
    { value: 'higher', label: 'Вища' },
    { value: 'secondary', label: 'Середня' },
    { value: 'vocational', label: 'Професійно-технічна' }
  ];

  // Education type options
  const educationTypeOptions = [
    { value: 'full-time', label: 'Денний' },
    { value: 'part-time', label: 'Заочний' },
    { value: 'evening', label: 'Вечірній' }
  ];

  // Contract type options
  const contractTypeOptions = [
    { value: 'contract', label: 'Контракт' },
    { value: 'permanent', label: 'Постійний' },
    { value: 'temporary', label: 'Тимчасовий' }
  ];

  // Termination reason options
  const terminationReasonOptions = [
    { value: 'voluntary', label: 'За власним бажанням, ст.38 КЗпП України' },
    { value: 'agreement', label: 'За згодою сторін' },
    { value: 'contract-end', label: 'Закінчення строку контракту' }
  ];

  return (
    <>
      <CssBaseline />
      <Box sx={{ width: '100%', height: '100vh', p: 0 }}>
        <Paper sx={{ p: 1.5, position: 'relative', width: '100%', height: '100%', overflow: 'auto' }}>
          <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Typography variant="subtitle2">Форма № П-2</Typography>
          </Box>
          
          {/* Tabs */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', borderBottom: 1, borderColor: 'divider', mb: 1.5 }}>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ 
                borderRadius: '0px 0px 0 0', 
                borderBottomColor: 'transparent', 
                m: 0.2,
                py: 0.5
              }}
            >
              Загальні відомості
            </Button>
            <Button variant="outlined" 
              size="small" 
              sx={{ 
                borderRadius: '0px 0px 0 0', 
                borderBottomColor: 'transparent', 
                m: 0.2,
                py: 0.5
              }}>
                Загальні відомості-2
            </Button>
            <Button variant="outlined" 
              size="small" 
              sx={{ 
                borderRadius: '0px 0px 0 0', 
                borderBottomColor: 'transparent', 
                m: 0.2,
                py: 0.5
              }}>
                Призначення і переведення
              </Button>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ 
                borderRadius: '0px 0px 0 0', 
                borderBottomColor: 'transparent', 
                m: 0.2,
                py: 0.5
              }}>
                Відпустки
              </Button>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ 
                borderRadius: '0px 0px 0 0', 
                borderBottomColor: 'transparent', 
                m: 0.2,
                py: 0.5
              }}>
                Додат. відомості
            </Button>
          </Box>

          <Grid container spacing={1}>
            {/* Left column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 150 }}>Ідентифікаційний код</Typography>
                <TextField 
                  name="identificationCode"
                  value={employeeData.identificationCode}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 180, mr: 1 }}
                />
                <Typography variant="body2" sx={{ width: 40 }}>Таб №</Typography>
                <TextField 
                  name="taxNumber"
                  value={employeeData.taxNumber}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 80 }}
                />
              </Box>

              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 150 }}>Страхове свідоцтво №</Typography>
                <TextField 
                  name="insuranceNumber"
                  value={employeeData.insuranceNumber}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 'calc(100% - 150px)', maxWidth: 300 }}
                />
              </Box>

              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 150 }}>Особова картка №</Typography>
                <TextField 
                  name="personalCardNumber"
                  value={employeeData.personalCardNumber}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 150 }}
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">1. Прізвище</Typography>
                <TextField 
                  name="lastName"
                  value={employeeData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Ім'я</Typography>
                <TextField 
                  name="firstName"
                  value={employeeData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">По батькові</Typography>
                <TextField 
                  name="patronymic"
                  value={employeeData.patronymic}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2">2. Рік народження</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField 
                    name="birthYear"
                    placeholder="Рік"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 80, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ mr: 1 }}>місяць</Typography>
                  <TextField 
                    name="birthMonth"
                    placeholder="ММ"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 60, mr: 1 }}
                  />
                  <Typography variant="body2" sx={{ mr: 1 }}>число</Typography>
                  <TextField 
                    name="birthDay"
                    placeholder="ДД"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 60 }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2">3. Місце народження</Typography>
                <TextField 
                  name="birthPlace"
                  value={employeeData.birthPlace}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">4. Освіта</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ width: 20 }}>а)</Typography>
                  <TextField
                    select
                    name="education"
                    value={employeeData.education}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: '100%', maxWidth: 220 }}
                  >
                    {educationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ mb: 0.5 }}>
                  <Typography variant="body2">б) Назва і дата закінчення ВУЗу:</Typography>
                  <TextField 
                    name="educationInstitution"
                    value={employeeData.educationInstitution}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    fullWidth
                  />
                </Box>

                <Box sx={{ mb: 0.5 }}>
                  <Typography variant="body2">в) Назва і дата закінчення ПТУ:</Typography>
                  <TextField 
                    name="vocationalSchool"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    fullWidth
                  />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: 100 }}>г) Вид навчання</Typography>
                  <TextField
                    select
                    name="educationType"
                    value={employeeData.educationType}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 'calc(100% - 100px)', maxWidth: 220 }}
                  >
                    {educationTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Підрозділ, де працює зараз:</Typography>
                <TextField
                  select
                  name="department"
                  value={employeeData.department}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 80 }}
                >
                  <MenuItem value="08">08</MenuItem>
                  <MenuItem value="01">01</MenuItem>
                  <MenuItem value="02">02</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Посада:</Typography>
                <TextField
                  select
                  name="position"
                  value={employeeData.position}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: '100%', maxWidth: 220 }}
                >
                  <MenuItem value="senior_lecturer">старший викладач</MenuItem>
                  <MenuItem value="lecturer">викладач</MenuItem>
                  <MenuItem value="assistant">асистент</MenuItem>
                </TextField>
              </Box>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 40 }}>Стать</Typography>
                <Typography variant="body2" sx={{ width: 50 }}>♀ ♂ ✓</Typography>
                <Typography variant="body2" sx={{ width: 130 }}>В інституті працює з</Typography>
                <TextField 
                  name="workingSince"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 70, mx: 1 }}
                />
                <Typography variant="body2">року</Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">5. Спеціальність за дипломом</Typography>
                <TextField 
                  name="specialization"
                  value={employeeData.specialization}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">6. Кваліфікація за дипломом(свідоцтвом)</Typography>
                <TextField 
                  name="qualification"
                  value={employeeData.qualification}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 80 }}>Диплом №</Typography>
                <TextField 
                  name="diplomaNumber"
                  value={employeeData.diplomaNumber}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 120, mr: 1 }}
                />
                <Typography variant="body2" sx={{ width: 20 }}>від</Typography>
                <TextField 
                  name="diplomaDate"
                  placeholder="ДД.ММ.РРРР"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 120 }}
                />
              </Box>

              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 170 }}>7. Загальний стаж роботи</Typography>
                <TextField 
                  name="totalExperience"
                  value={employeeData.totalExperience}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 120 }}
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ width: 170 }}>8. Безперервний стаж роботи</Typography>
                  <TextField 
                    name="continuousExperience"
                    value={employeeData.continuousExperience}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 120 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ width: 130 }}>Дата прийому в НТУ</Typography>
                  <TextField 
                    name="hiringDate"
                    placeholder="ДД.ММ.РРРР"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 120 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ width: 130 }}>№ наказу на прийом</Typography>
                  <TextField 
                    name="hiringOrderNumber"
                    value={employeeData.hiringOrderNumber}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 120 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ width: 130 }}>Дата наказу на прийом</Typography>
                  <TextField 
                    name="hiringOrderDate"
                    placeholder="ДД.ММ.РРРР"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: 120 }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">9. Останнє місце роботи, посада, професія</Typography>
                <TextField 
                  name="lastWorkplace"
                  value={employeeData.lastWorkplace}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 120 }}>10. Дата звільнення</Typography>
                <TextField 
                  name="terminationDate"
                  placeholder="ДД.ММ.РРРР"
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 120 }}
                />
              </Box>

              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ width: 120 }}>Причина звільнення</Typography>
                <TextField
                  select
                  name="terminationReason"
                  value={employeeData.terminationReason}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  sx={{ width: 'calc(100% - 120px)', maxWidth: 300 }}
                >
                  {terminationReasonOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">Трудова угода</Typography>
                    <TextField
                      select
                      name="contractType"
                      value={employeeData.contractType}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      fullWidth
                    >
                      {contractTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body2">Термін закінч. труд угоди</Typography>
                    <TextField 
                      name="contractEndDate"
                      placeholder="ДД.ММ.РРРР"
                      variant="outlined"
                      size="small"
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" size="small" sx={{ m: 0.3 }}>Видалити</Button>
            <Button variant="contained" size="small" sx={{ m: 0.3 }}>Друк 1-ї сторінки</Button>
            <Button variant="contained" size="small" sx={{ m: 0.3 }}>Друк 2-ї сторінки</Button>
            <Button variant="contained" size="small" sx={{ m: 0.3 }}>Вихід</Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default EmployeeForm;