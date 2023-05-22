import { useState, useEffect } from 'react';
import { Stack, TextField, Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MakeReservation() {

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputRequests, setInputRequests] = useState('');

  let timeoutRef = 0;

  const navigate = useNavigate();

  const {t} = useTranslation();

  /**
   * On load:
   * Create the reservation
   * Set 5 minute timer
   * If not submitted, delete reservation
   */
  useEffect(() => {
    //create reservation (guest id = -1)
    timeoutRef = setTimeout(() => {
      handleCancelReservation();
    }, 1000*60*5); //5 minutes
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