import { 
  Typography,
  Stack, 
  TextField, 
  Button, 
  InputLabel, 
  Select, 
  MenuItem,
  FormControl
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
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

  const navigate = useNavigate();

  const [numGuests, setNumGuests] = useState('2');
  const [roomType, setRoomType] = useState('');
  const [checkinDate, setCheckinDate] = useState<Dayjs|null>(dayjs(new Date()));
  const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(dayjs(new Date()));

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  /**
   * on component load, display nothing until data is loaded
   */
  useEffect(() => {
    setIsLoading(true);
    //fetch room types
    setIsLoading(false);
  }, []);


  function handleSearch() {
    if (Number(numGuests) < 1) {
      setErrorMsg('You must have at least one guest.')
    } else if (roomType === '') {
      setErrorMsg('Please select a room type.')
    } else if (checkinDate && checkoutDate && checkinDate?.toDate() >= checkoutDate?.toDate()) {
      setErrorMsg('Check-out date must be at least 1 day after check-in date!')
    } else {
      setErrorMsg('');
      console.log(numGuests);
      console.log(roomType);
      console.log(checkinDate?.toDate());
      console.log(checkoutDate?.toDate());
      const params = {
        numGuests: numGuests,
        roomType: roomType,
        checkinDate: checkinDate?.toString() ?? '', //TODO: fix formatting of these strings
        checkoutDate: checkoutDate?.toString() ?? ''
      }
      navigate({pathname: '/searchResults', search: `?${createSearchParams(params)}`});
    }
    
  }

  /**
   * display nothing until data is loaded
   */
  if (isLoading) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>

      <TextField 
        label='Number of guests' 
        type='number'
        value={numGuests} 
        onChange={(event) => setNumGuests(event.target.value)}
      />

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