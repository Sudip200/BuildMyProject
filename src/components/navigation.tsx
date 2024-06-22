import { Drawer, Box, List, ListItem, ListItemText, Divider, ListSubheader, ListItemIcon, Avatar, Link } from '@mui/material';
import { Dashboard as DashboardIcon, Settings as SettingsIcon, AccountBox, PersonAdd } from '@mui/icons-material';
import { useRouter } from 'next/router';

const NavigationDrawer = ({ isOpen, onClose, isLoggin, uid }) => {
  const router = useRouter();
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
          <Divider className="bg-gray-600" />
          <ListSubheader className="bg-gray-800 text-gray-400">Navigation</ListSubheader>
          <ListItem button onClick={() => router.push({ pathname: '/userdashboard', query: { uid: uid.uid } })}>
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
          <Divider className="bg-gray-600" />
          <ListSubheader className="bg-gray-800 text-gray-400">Account</ListSubheader>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <AccountBox />
            </ListItemIcon>
            <Link href='/clientregister' className="text-white no-underline hover:underline">Client Sign In</Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <PersonAdd />
            </ListItemIcon>
            <Link href='/useregister' className="text-white no-underline hover:underline">Freelancer Sign In</Link>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
