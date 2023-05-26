import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Stack, 
  TextField,
  Typography
} from '@mui/material';
import { useCreateGuestMutation } from '../api/guestApi';
import { useNavigate } from 'react-router-dom';

/*export type GuestType = {
    id?: number,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    password?: string
}*/

export default function UserRegistration() {

  const {t} = useTranslation();
  const navigate = useNavigate();
  
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const [createGuest] = useCreateGuestMutation();

  function handleRegister() {
    if (inputName && inputEmail && inputPhone && inputAddress && inputPassword &&
      (inputPassword === inputConfirmPassword)
    ) {
      createGuest({
        name: inputName,
        email: inputEmail,
        phoneNumber: inputPhone,
        address: inputAddress,
        password: inputPassword
      })
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        setErrorMsg(String(t('register-error-backend')));
      })
    } else {
      setErrorMsg(String(t('register-error-frontend')))
    }
  }

  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
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
        type='password'
        label={t('password')}
        value={inputPassword} 
        onChange={e => setInputPassword(e.target.value)} 
      />
      <TextField 
        type='password'
        label={t('confirm-password')}
        value={inputConfirmPassword} 
        onChange={e => setInputConfirmPassword(e.target.value)} 
      />
      <Button
        variant='contained'
        onClick={handleRegister}
      >
        {t('register')}
      </Button>
      <Typography color={'red'}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}