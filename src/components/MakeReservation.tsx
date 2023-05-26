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

  const [inputRequests, setInputRequests] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const {t} = useTranslation();
  const [user] = useContext(UserIdContext);
  const [searchParams] = useSearchParams();

  const roomId = Number(searchParams.get('roomId'));
  const checkinDate = new Date(searchParams.get('checkinDate') ?? 0);
  const checkoutDate = new Date(searchParams.get('checkoutDate') ?? 0);
  const numGuests = Number(searchParams.get('numGuests'))

  const [createReservation] = useCreateReservationMutation();

  const {
    data: room,
    refetch: _refetchRoom
  } = useFindRoomByIdQuery(roomId)

  function handleCreateReservation() {
    if (inputRequests) {
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
        setErrorMsg('');
        navigate('/');
      })
      .catch(() => {
        setErrorMsg(String(t('create-error-backend')));
      })
    } else {
      setErrorMsg(String(t('create-error-emptyrequests')));
    }
  }

  function handleCancelReservation() {
    navigate('/');
  }

  if (!user) {
    return (
      <Typography variant="h5">
        {t('login-required')}
      </Typography>
    )
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>

      <Typography sx={{fontWeight: 'bold'}}>
        {t('room')} {room?.roomNumber}
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

      <Typography color={'red'}>
        {errorMsg}
      </Typography>

    </Stack>
  )
}