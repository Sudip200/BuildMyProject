import { Drawer, Box, List, ListItem, ListItemText, Divider, ListSubheader, ListItemIcon, Avatar, Link } from '@mui/material';
import { Dashboard as DashboardIcon, Settings as SettingsIcon, AccountBox, PersonAdd } from '@mui/icons-material';
import { useRouter } from 'next/router';

const NavigationDrawer = ({ isOpen, onClose, isLoggin, uid ,login }) => {
  const router = useRouter();
  const sx={
    color: 'white',
    textDecoration: 'none'
  }
  const graysx={
    backgroundColor: 'rgb(31, 41, 55)',
    color: 'white'

  }
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: 'rgb(31, 41, 55)',
          color: 'white'
        }
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
        className="bg-gray-800"
      >
        <List>
          <ListItem>
            <Avatar className="bg-gray-600" />
          </ListItem>
          <ListItem>
            <ListItemText primary="John Doe" className="text-white" />
          </ListItem>
          <Divider  style={{border: '0.2px solid white'}}  />
          <ListSubheader sx={graysx}>Navigation</ListSubheader>
          <ListItem button onClick={() => login.login=='Client'? router.push({ pathname: '/clientdashboard'}):router.push({pathname:'/userdashboard'})}>
            <ListItemIcon className="text-gray-400">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="text-white" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" className="text-white" />
          </ListItem>
          <Divider style={{border: '0.2px solid white'}} />
          <ListSubheader sx={graysx} >Account</ListSubheader>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <AccountBox />
            </ListItemIcon>
            <Link href='/clientregister' sx={sx}>Client Sign In</Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <PersonAdd />
            </ListItemIcon>
            <Link href='/useregister' sx={sx}>Freelancer Sign In</Link>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
