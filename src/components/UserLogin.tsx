import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  Stack,
  TextField,
  Button,
  Typography
} from "@mui/material";

import { useLoginMutation } from "../api/authApi";
import UserIdContext from "../contexts/UserContext";

export default function UserLogin() {

  /**
   * Context and utils
   */
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [_user, setUser] = useContext(UserIdContext);

  /**
   * States
   */
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  /**
   * API call
   */
  const [auth] = useLoginMutation();

  /**
   * Handles logging in
   */
  function handleLogin() {
    auth({email: inputEmail, password: inputPassword})
    .unwrap()
    .then((res) => {
      setErrorMsg('');
      setUser(res);
      navigate('/');
    })
    .catch((_error) => {
      setErrorMsg(String(t('login-error')));
    })
  }

  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      <TextField 
        label={t('email')} 
        value={inputEmail} 
        onChange={e => setInputEmail(e.target.value)} 
      />
      <TextField 
        label={t('password')} 
        type='password'
        value={inputPassword} 
        onChange={e => setInputPassword(e.target.value)} 
      />
      <Button
        variant='contained'
        onClick={handleLogin}
      >
        {t('login')}
      </Button>
      <Typography color={'red'}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}