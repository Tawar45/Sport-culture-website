import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import styles from './FilterSection.module.css';

interface FilterSectionProps {
  onSearch: (filters: {
    city: string;
    sport: string;
    date: string;
    time: string;
  }) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onSearch }) => {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(false);

  const categories = [
    // 'Pickleball',
    'TENNIS',
    'BADMINTON',
    'TABLE TENNIS',
    'PICKLEBALL',
    // 'Badminton',
  ];

  const cities = [
    'AHMEDABAD',
    'INDORE',
    'VADODARA',
    'SURAT',
  ];

  const handleSearch = async () => {
    if (!selectedCity || !selectedSport || !selectedDate || !selectedTime) {
      return;
    }

    try {
      setLoading(true);
      const searchParams = {
        city: selectedCity,
        sport: selectedSport,
        date: selectedDate.format('DD-MM-YYYY'),
        time: selectedTime.format('HH:mm'),
      };

      onSearch(searchParams);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.sport_spc} px-4 sm:px-8 py-4`}>
      <div className={`flex-1 w-full ${styles.inputSeparator}`}>
        <FormControl variant="standard" fullWidth sx={{
          '& .MuiInputBase-root': {
            padding: '0',
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: 'none' },
            fontSize: 'inherit',
            marginTop: 0,
          },
          '& .MuiInputLabel-root': {
            fontWeight: 600,
            position: 'static',
            transform: 'none',
            marginBottom: '0px',
            lineHeight: '1',
            paddingTop: '0px',
          },
          '& .MuiInputLabel-shrink': {
            transform: 'none',
          },
          '& .MuiSelect-select': {
            padding: '0px !important',
            height: 'auto',
            minHeight: '23px',
            display: 'flex',
            alignItems: 'center',
          },
        }}>
          <InputLabel htmlFor="sport">Sport</InputLabel>
          <Select
            id="sport"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value as string)}
            label="Sport"
            disableUnderline
            displayEmpty
            renderValue={(selected) => {
              if (selected === '') {
                return <em>Select a sport</em>;
              }
              return selected;
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                },
              },
            }}
          >
            <MenuItem value="" disabled style={{ color: '#888' }}>Select a sport</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={`flex-1 w-full ${styles.inputSeparator}`}>
        <FormControl variant="standard" fullWidth sx={{
          '& .MuiInputBase-root': {
            padding: '0',
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: 'none' },
            fontSize: 'inherit',
            marginTop: 0,
          },
          '& .MuiInputLabel-root': {
            fontWeight: 600,
            position: 'static',
            transform: 'none',
            marginBottom: '0px',
            lineHeight: '1',
            paddingTop: '0px',
          },
          '& .MuiInputLabel-shrink': {
            transform: 'none',
          },
          '& .MuiSelect-select': {
            padding: '0px !important',
            height: 'auto',
            minHeight: '23px',
            display: 'flex',
            alignItems: 'center',
          },
        }} disabled={!selectedSport}>
          <InputLabel htmlFor="where">Where</InputLabel>
          <Select
            id="where"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value as string)}
            label="Where"
            disableUnderline
            displayEmpty
            renderValue={(selected) => {
              if (selected === '') {
                return <em>Select a city</em>;
              }
              return selected;
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                },
              },
            }}
          >
            <MenuItem value="" disabled style={{ color: '#888' }}>Select a city</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={`flex-1 w-full ${styles.inputSeparator}`} style={{ minWidth: '200px' }}>
        <label htmlFor="when" className={`${styles.text_dark}`}>When</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-full"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            disabled={!selectedCity}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                variant: 'standard',
                fullWidth: true,
                InputLabelProps: {
                  disabled: !selectedCity,
                  sx: {
                    fontWeight: 600,
                    position: 'static',
                    transform: 'none',
                    marginBottom: '0px',
                    lineHeight: '1',
                    paddingTop: '0px',
                  },
                },
                sx: {
                  '& .MuiInputBase-root': {
                    padding: '0',
                    '&:before': { borderBottom: 'none !important' },
                    '&:after': { borderBottom: 'none !important' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none !important' },
                    fontSize: 'inherit',
                    marginTop: 0,
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'none',
                  },
                  '& .MuiInputBase-input': {
                    padding: '0px !important',
                    height: 'auto',
                    minHeight: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 0,
                  },
                  '& .css-1sh1pda-MuiPickersInputBase-root-MuiPickersInput-root::before': {
                    borderBottom: '0px',
                  },
                  '& .css-1sh1pda-MuiPickersInputBase-root-MuiPickersInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: 'none',
                  },
                  minWidth: '200px',
                },
              }
            }}
          />
        </LocalizationProvider>
      </div>

      <div className={`flex-1 w-full`} style={{ minWidth: '200px' }}>
        <label htmlFor="time" className={`${styles.text_dark}`}>Time</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="w-full"
            value={selectedTime}
            onChange={(newValue) => setSelectedTime(newValue)}
            disabled={!selectedDate}
            views={['hours']}
            format="HH"
            slotProps={{
              textField: {
                variant: 'standard',
                fullWidth: true,
                InputLabelProps: {
                  disabled: !selectedDate,
                  sx: {
                    fontWeight: 600,
                    position: 'static',
                    transform: 'none',
                    marginBottom: '0px',
                    lineHeight: '1',
                    paddingTop: '0px',
                  },
                },
                sx: {
                  '& .MuiInputBase-root': {
                    padding: '0',
                    '&:before': { borderBottom: 'none !important' },
                    '&:after': { borderBottom: 'none !important' },
                    '&:hover:not(.Mui-disabled):before': { borderBottom: 'none !important' },
                    fontSize: 'inherit',
                    marginTop: 0,
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'none',
                  },
                  '& .MuiInputBase-input': {
                    padding: '0px !important',
                    height: 'auto',
                    minHeight: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 0,
                  },
                  '& .css-1sh1pda-MuiPickersInputBase-root-MuiPickersInput-root::before': {
                    borderBottom: '0px',
                  },
                  '& .css-1sh1pda-MuiPickersInputBase-root-MuiPickersInput-root:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: 'none',
                  },
                  minWidth: '200px',
                },
              }
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="flex-1 w-full text-right">
        <button
          className={`${styles.customButton} w-full md:w-auto font-bold py-3.5 px-8 shadow-md transition duration-300 transform hover:scale-105`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default FilterSection; 