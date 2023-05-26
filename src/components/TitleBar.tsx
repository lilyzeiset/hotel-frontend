import { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Stack
 } from '@mui/material';
 import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserIdContext from '../contexts/UserContext';
import { useLogoutMutation } from '../api/authApi';

/**
 * Title bar component
 * @param props drawerWidth to be passed in as prop
 */
export default function TitleBar (props: {drawerWidth: number}) {

  const drawerWidth = props.drawerWidth;
  
  /**
   * utils
   */
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const [user, setUser] = useContext(UserIdContext);

  /**
   * Anchor element state for showing/hiding language menu
   */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * API Call
   */
  const [logout] = useLogoutMutation();

  /**
   * Changes language and closes menu
   * @param lang the new language
   */
  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    handleClose();
  }

  /**
   * handles displaying language menu
   */
  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event?.currentTarget);
  }

  /**
   * handles closing language menu
   */
  function handleClose() {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ 
        width: `calc(100% - ${drawerWidth}px)`, 
        ml: `${drawerWidth}px`
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          {t('page-title')} {import.meta.env.VITE_APP_TITLE_SUFFIX}
        </Typography>
        <Stack spacing={2} direction='row' sx={{display: 'flex', alignItems: 'center'}}>
        {user ? ( 
          <>
            <Typography>
              {t('logged-in-as')}: {user?.name}
            </Typography>
            <Button 
              variant='text'
              color='secondary'
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              {t('logout')}
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant='text'
              color='secondary'
              onClick={() => navigate('/register')}
            >
              {t('register')}
            </Button>
            <Button 
              variant='text'
              color='secondary'
              onClick={() => navigate('/login')}
            >
              {t('login')}
            </Button>
          </>
        )}
        <div>
          <IconButton
            size="large"
            aria-label="change language"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <TranslateIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('de')}>Deutsch</MenuItem>
          </Menu>
        </div>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}