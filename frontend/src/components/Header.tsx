import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'

const Header = () => {
  return (
    <AppBar sx={{ bgColor: 'transparent', position: 'static', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
      </Toolbar>
    </AppBar>
  )
}

export default Header