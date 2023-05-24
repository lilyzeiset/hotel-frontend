import { useState, useEffect } from 'react';
import { Stack, TextField, Typography, Button } from "@mui/material"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCreateReservationMutation } from '../api/reservationApi';

export default function MakeReservation() {

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputRequests, setInputRequests] = useState('');

  let timeoutRef = 0;

  const navigate = useNavigate();

  const {t} = useTranslation();

  const [createReservation] = useCreateReservationMutation();

  const [searchParams] = useSearchParams();

  /*
  export type ReservationType = {
    id?: number,
    guestId: number,
    roomId: number,
    checkinDate: Date,
    checkoutDate: Date,
    numberOfGuests: number,
    specialRequests: string
  }
  */

  /**
   * On load:
   * Create the reservation
   * Set 5 minute timer
   * If not submitted, delete reservation
   */
  useEffect(() => {
    //create reservation (guest id = -1)
    createReservation({
      guestId: -1,
      roomId: Number(searchParams.get('roomId')),
      checkInDate: new Date(searchParams.get('checkinDate') ?? 0),
      checkOutDate: new Date(searchParams.get('checkoutDate') ?? 0),
      numberOfGuests: Number(searchParams.get('numGuests')),
      specialRequests: ''
    })

    //set 5 min timer to cancel
    timeoutRef = setTimeout(() => {
      handleCancelReservation();
    }, 1000*60*5); //5 minutes

    //returned func from useEffect gets run when component unmounts
    return () => {
      clearTimeout(timeoutRef);
    }
  }, []);

  function handleCreateReservation() {
    //create guest if not exists
    //update reservation (guest_id, specialrequests)
    clearTimeout(timeoutRef);
  }

  function handleCancelReservation() {
    //delete reservtion
    clearTimeout(timeoutRef);
    navigate('/');
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      <Typography variant='h5'>
        {t('res-tempreserved')}
      </Typography>
      <Typography variant='h5'>
        {t('res-enterinfo')}
      </Typography>
      <TextField 
        label={t('name')}
        value={inputName} 
        onChange={e => setInputName(e.target.value)} 
      />
      <TextField 
        label={t('email')}
        value={inputEmail} 
        onChange={e => setInputEmail(e.target.value)} 
      />
      <TextField 
        label={t('phonenumber')}
        value={inputPhone} 
        onChange={e => setInputPhone(e.target.value)} 
      />
      <TextField 
        label={t('address')}
        value={inputAddress} 
        onChange={e => setInputAddress(e.target.value)} 
      />
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
    </Stack>
  )
}