import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton
 } from '@mui/material';
 import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

/**
 * Title bar component
 * @param props drawerWidth to be passed in as prop
 */
export default function TitleBar (props: {drawerWidth: number}) {

  const drawerWidth = props.drawerWidth;
  
  const {t, i18n} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    handleClose();
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event?.currentTarget);
  }

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
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {t('page-title')}
        </Typography>
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
      </Toolbar>
    </AppBar>
  )
}