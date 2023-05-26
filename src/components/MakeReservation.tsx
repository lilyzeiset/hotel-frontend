import { 
  useState, 
  useContext 
} from 'react';
import { Stack, TextField, Typography, Button } from "@mui/material"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCreateReservationMutation } from '../api/reservationApi';
import UserIdContext from '../contexts/UserContext';
import { useFindRoomByIdQuery } from '../api/roomApi';

export default function MakeReservation() {

  /**
   * Contexts and utilities
   */
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [user] = useContext(UserIdContext);

  /**
   * States
   */
  const [inputRequests, setInputRequests] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  /**
   * Parsing search params
   */
  const [searchParams] = useSearchParams();

  const roomId = Number(searchParams.get('roomId'));
  const numGuests = Number(searchParams.get('numGuests'))

  const checkinDateParam = searchParams.get('checkinDate');
  const [inYear, inMonth, inDay] = (checkinDateParam ?? '0').split('-');
  const checkinDate = new Date(Number(inYear), Number(inMonth)-1, Number(inDay));

  const checkoutDateParam = searchParams.get('checkoutDate');
  const [outYear, outMonth, outDay] = (checkoutDateParam ?? '0').split('-');
  const checkoutDate = new Date(Number(outYear), Number(outMonth)-1, Number(outDay));

  /**
   * Queries
   */
  const [createReservation] = useCreateReservationMutation();

  const {
    data: room,
    refetch: _refetchRoom
  } = useFindRoomByIdQuery(roomId)

  /**
   * Handles creating a reservation
   */
  function handleCreateReservation() {
    if (inputRequests) {
      setErrorMsg('');
      setSuccessMsg(String(t('create-success')));
      createReservation({
        guestId: user.id,
        roomId: roomId,
        checkInDate: checkinDate,
        checkOutDate: checkoutDate,
        numberOfGuests: numGuests,
        specialRequests: inputRequests
      })
      .unwrap()
      .then(() => {
        navigate('/myReservations');
      })
      .catch(() => {
        setErrorMsg(String(t('create-error-backend')));
      })
    } else {
      setErrorMsg(String(t('create-error-emptyrequests')));
    }
  }

  /**
   * Handles cancelling creating a reservation
   * send user back one page in history (to search results)
   */
  function handleCancelReservation() {
    navigate(-1);
  }

  /**
   * Must be logged in to create reservation
   * Tell user to log in if they're not
   */
  if (!user) {
    return (
      <Typography variant="h5">
        {t('login-required')}
      </Typography>
    )
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>

      <Typography variant='h5' sx={{fontWeight: 'bold'}}>
        {t('room')} {room?.roomNumber}
      </Typography>
      <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        {room?.roomType?.description}
      </Typography>
      <Typography>
        {t('checkinday')}:&nbsp;
        {checkinDate.toDateString()}
      </Typography>
      <Typography>
        {t('checkoutday')}:&nbsp;
        {checkoutDate.toDateString()}
      </Typography>
      <Typography>
        {t('totalcost')}:&nbsp;
        ${(room?.nightlyRate ?? 0) * Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000*60*60*24))}
      </Typography>
      
      <TextField 
        label={t('specialrequests')}
        value={inputRequests} 
        onChange={e => setInputRequests(e.target.value)} 
      />
      <Stack spacing={2} direction='row'>
        <Button 
          variant='contained' 
          onClick={() => handleCreateReservation()}
        >
          {t('create-reservation')}
        </Button>
        <Button 
          variant='outlined' 
          onClick={() => handleCancelReservation()}
        >
          {t('cancel')}
        </Button>
      </Stack>

      {successMsg ? (
        <Typography color={'green'}>
          {successMsg}
        </Typography>
      ) : (
        <Typography color={'red'}>
          {errorMsg}
        </Typography>
      )}

    </Stack>
  )
}