import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './Logo'
import { useAuth } from '../../context/AuthContext'
import NavigationLink from './NavigationLink'

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar sx={{ bgColor: 'transparent', position: 'static', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
        <div>
          {
            auth?.isLoggedIn && (
              <>
                <NavigationLink to="/chat" bg="#00fffc" text="Go to chat" textColor='black' />
                <NavigationLink to="/" bg="#51538f" text="Logout" textColor='white' onClick={auth?.logout} />
              </>
            )
          }
          {
            !auth?.isLoggedIn && (
              <>
                <NavigationLink to="/login" bg="#00fffc" text="Login" textColor='black' />
                <NavigationLink to="/signup" bg="#51538f" text="Signup" textColor='white' />
              </>
            )
          }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header