import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Sidebar component
 * @param props drawerWidth to be passed in as prop
 */
export default function Sidebar(props: {drawerWidth: number}) {

  const drawerWidth = props.drawerWidth;

  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Home button */}
      <Toolbar>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('sidebar-home')} />
          </ListItemButton>
        </ListItem>
      </Toolbar>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/search/')}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={t('sidebar-search')} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/myReservations/')}>
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText primary={t('sidebar-reservations')} />
          </ListItemButton>
        </ListItem>
      </List>
      
    </Drawer>
  )
}