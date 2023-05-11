import { 
  Typography,
  Stack, 
  TextField, 
  Button, 
  InputLabel, 
  Select, 
  SelectChangeEvent, 
  MenuItem,
  FormControl
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, {Dayjs} from "dayjs";

/**
 * Search page
 */
export default function Search() {

  const roomTypes = [
    'Standard',
    'Deluxe',
    'Family',
    'Executive',
    'Penthouse'
  ];

  const [roomType, setRoomType] = useState('');
  const [checkinDate, setCheckinDate] = useState<Dayjs|null>(dayjs(new Date()));
  const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(dayjs(new Date()));
  const [errorMsg, setErrorMsg] = useState('');


  function handleSearch() {
    if (roomType === '') {
      setErrorMsg('Please select a room type.')
    } else if (checkinDate && checkoutDate && checkinDate?.toDate() >= checkoutDate?.toDate()) {
      setErrorMsg('Check-out date must be at least 1 day after check-in date!')
    } else {
      setErrorMsg('');
      console.log(roomType);
      console.log(checkinDate?.toDate());
      console.log(checkoutDate?.toDate());
    }
    
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>

      <FormControl>
        <InputLabel id="roomtype-select-label">Room type</InputLabel>
        <Select required
          labelId="roomtype-select-label"
          id="roomtype-select"
          label='Room type'
          value={roomType}
          onChange={(event) => setRoomType(event.target.value)}
        >
          {roomTypes?.map((roomType) => (
            <MenuItem key={roomType} value={roomType}>
              {roomType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePicker 
        label='Check-in date' 
        value={checkinDate}
        onChange={(date) => setCheckinDate(date)}
      />
      <DatePicker 
        label='Check-out date' 
        value={checkoutDate}
        onChange={(date) => setCheckoutDate(date)}
      />

      <Button variant='contained' onClick={handleSearch}>
        Search
      </Button>

      <Typography variant='body1' sx={{color: 'red'}}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}