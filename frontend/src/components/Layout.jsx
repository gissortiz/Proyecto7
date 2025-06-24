import React from 'react'
import NavbarComponent from './NavbarComponent'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


const Layout = () => {
  return (
    <div>
    <NavbarComponent/>
    <Outlet/>
    <Footer/>
    </div>

  )
}

export default Layout