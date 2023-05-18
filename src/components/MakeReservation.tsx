import { useState, useEffect } from 'react';
import { Stack, TextField, Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

export default function MakeReservation() {

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputRequests, setInputRequests] = useState('');

  let timeoutRef = 0;

  const navigate = useNavigate();

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
    navigate('/home');
  }

  return (
    <Stack spacing={2} sx={{minWidth: 480}}>
      <Typography variant='h5'>
        Your room has been temporarily reserved for the next 5 minutes.
      </Typography>
      <Typography variant='h5'>
        Please enter your information to confirm reservation.
      </Typography>
      <TextField 
        label='Name' 
        value={inputName} 
        onChange={e => setInputName(e.target.value)} 
      />
      <TextField 
        label='Email' 
        value={inputEmail} 
        onChange={e => setInputEmail(e.target.value)} 
      />
      <TextField 
        label='Phone number' 
        value={inputPhone} 
        onChange={e => setInputPhone(e.target.value)} 
      />
      <TextField 
        label='Address' 
        value={inputAddress} 
        onChange={e => setInputAddress(e.target.value)} 
      />
      <TextField 
        label='Requests for hotel staff' 
        value={inputRequests} 
        onChange={e => setInputRequests(e.target.value)} 
      />
      <Stack spacing={2} direction='row'>
        <Button 
          variant='contained' 
          onClick={() => handleCreateReservation()}
        >
          Create Reservation
        </Button>
        <Button 
          variant='outlined' 
          onClick={() => handleCancelReservation()}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  )
}