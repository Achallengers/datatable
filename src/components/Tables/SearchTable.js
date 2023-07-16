import React, {useState} from 'react';
import {Box, Button, TextField, Grid, Alert, AlertTitle, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {MobileDatePicker}   from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useData } from '../../contexts/DataTableContext'; 
import api from '../../services/api'

export default function SearchTable() {
  const [startDate, setStartDate] = useState(dayjs('2022-04-17'));
  const [endDate, setEndDate] = useState(dayjs('2022-04-17'));
  const [searchName, setSearchName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { setFilteredData } = useData();

  useEffect(() => {
    
    const getTableData = async () => {
      try {
        const params = {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          searchName,
        };

        const response = await api.get('/dados', { params });
        setFilteredData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
      }
    };

    getTableData();
  }, [startDate, endDate, searchName]);

  const handleFilterClick = () => {
    
    (!startDate || !endDate || !searchName) ? setShowAlert(true) : setShowAlert(false);

    try {
      const params = {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        searchName,
      };

      const response = api.get('/endpoint', { params })

      setFilteredData(response.data);
      
    } catch (error) {
      console.error('Erro ao fazer a chamada para a API:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1,  mb: 4 }} >
      <Typography variant="h4" component="h2" sx={{ mb: 4, align: 'center', gutterBottom: true}} >
        Tabela de Clientes
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <Grid container spacing={2} components={[
            'MobileDatePicker',
          ]}>
            <Grid item xs={4}>
              <MobileDatePicker 
                label="Data Início"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                defaultValue={dayjs('2022-04-17')} 
              />
            </Grid>
            <Grid item xs={4}>
              <MobileDatePicker
                label="Data Fim"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                defaultValue={dayjs('2022-04-17')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField 
                id="outlined-basic" 
                label="Buscar por nome" 
                variant="outlined"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
              <Button variant="outlined" endIcon={<SearchIcon />} onClick={handleFilterClick} >Filtrar</Button>
            </Grid>
          </Grid>

          {showAlert && (
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              <AlertTitle>Erro</AlertTitle>
              Por favor, preencha todos os campos antes de filtrar.
            </Alert>
          )}
      </LocalizationProvider>
    </Box>
  );
}