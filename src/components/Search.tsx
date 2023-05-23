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
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import dayjs, {Dayjs} from "dayjs";
import { useTranslation } from "react-i18next";
// import { useFindAllRoomtypesQuery } from "../api/roomtypeApi";

/**
 * Search page
 */
export default function Search() {

  // const {
  //   data: roomtypes,
  //   refetch: _refetchRoomtypes
  // } = useFindAllRoomtypesQuery();

  const navigate = useNavigate();
  const {t} = useTranslation();

  const [numGuests, setNumGuests] = useState('2');
  // const [roomType, setRoomType] = useState('');
  const [checkinDate, setCheckinDate] = useState<Dayjs|null>(dayjs(new Date()));
  const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(dayjs(new Date()));
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('1000');

  const [errorMsg, setErrorMsg] = useState('');

  /**
   * Handles submitting a search
   * including showing an error message
   */
  function handleSearch() {
    if (Number(numGuests) < 1) {
      setErrorMsg(t('search-error-numguests') ?? '')
    // } else if (roomType === '') {
    //   setErrorMsg(t('search-error-roomtype') ?? '')
    } else if (checkinDate && checkoutDate && checkinDate?.toDate() >= checkoutDate?.toDate()) {
      setErrorMsg(t('search-error-dates') ?? '')
    } else if (Number(maxPrice) < Number(minPrice)) {
      setErrorMsg(t('search-error-price') ?? '')
    } else {
      setErrorMsg('');
      const params = {
        numGuests: numGuests,
        // roomType: roomType,
        checkinDate: checkinDate?.format('YYYY-MM-DD') ?? '',
        checkoutDate: checkoutDate?.format('YYYY-MM-DD') ?? '',
        minPrice: minPrice,
        maxPrice: maxPrice
      }
      navigate({pathname: '/searchResults', search: `?${createSearchParams(params)}`});
    }
    
  }

  return (
    <Stack spacing={2} sx={{width: 480}}>

      <TextField 
        label={t('search-numberofguests')}
        type='number'
        value={numGuests} 
        onChange={(event) => setNumGuests(event.target.value)}
      />

{/* 
      <FormControl>
        <InputLabel id="roomtype-select-label">{t('search-roomtype')}</InputLabel>
        <Select required
          labelId="roomtype-select-label"
          id="roomtype-select"
          label={t('search-roomtype')}
          value={roomType}
          onChange={(event) => setRoomType(event.target.value)}
        >
          {roomtypes?.map((roomtype) => (
            <MenuItem key={roomtype.id} value={roomtype.id}>
              {roomtype.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> 
*/}

      <Stack spacing={2} direction={'row'}>
        <DatePicker 
          label={t('search-checkindate')}
          value={checkinDate}
          onChange={(date) => setCheckinDate(date)}
        />
        <DatePicker 
          label={t('search-checkoutdate')}
          value={checkoutDate}
          onChange={(date) => setCheckoutDate(date)}
        />
      </Stack>

      <Stack spacing={2} direction={'row'}>
        <TextField fullWidth={true}
          label={t('search-minprice')}
          type='number'
          value={minPrice} 
          onChange={(event) => setMinPrice(event.target.value)}
        />
        <TextField fullWidth={true}
          label={t('search-maxprice')}
          type='number'
          value={maxPrice} 
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </Stack>

      <Button variant='contained' onClick={handleSearch}>
        Search
      </Button>

      <Typography variant='body1' sx={{color: 'red'}}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}