import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Sidebar component
 * @param props drawerWidth to be passed in as prop
 */
export default function Sidebar(props: {drawerWidth: number}) {

  const drawerWidth = props.drawerWidth;

  const navigate = useNavigate();
  const location = useLocation();

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
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
      </Toolbar>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/search/')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary='Search for rooms' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/myReservations/')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary='My reservations' />
          </ListItemButton>
        </ListItem>
      </List>
      
    </Drawer>
  )
}