
import { Drawer, Box, List, ListItem, ListItemText, Divider, ListSubheader, ListItemIcon, Avatar, Link } from '@mui/material';
import { Dashboard as DashboardIcon, Settings as SettingsIcon, AccountBox, PersonAdd } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Sidebar = ({ isLoggin, uid ,login }) => {
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
    <div className='bg-gray-900 h-full'>
        

      <Box
        sx={{ width:290 }}
        role="presentation"
        className="bg-gray-900"
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
              <DashboardIcon className='text-white' />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="text-white" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <SettingsIcon className='text-white' />
            </ListItemIcon>
            <ListItemText primary="Settings" className="text-white" />
          </ListItem>
          <Divider style={{border: '0.2px solid white'}} />
          <ListSubheader sx={graysx} >Account</ListSubheader>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <AccountBox className='text-white'/>
            </ListItemIcon>
            <Link href='/clientregister' sx={sx}>Client Sign In</Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon className="text-gray-400">
              <PersonAdd className='text-white'/>
            </ListItemIcon>
            <Link href='/useregister' sx={sx}>Freelancer Sign In</Link>
          </ListItem>
        </List>
      </Box>
    
    </div>
  )
}

export default Sidebar
