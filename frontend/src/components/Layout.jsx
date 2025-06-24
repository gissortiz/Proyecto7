import React from 'react'
import NavbarComponent from './NavbarComponents'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { AppProvider } from "../AppContext";


const Layout = () => {
  return (
    <div>
    <NavbarComponent/>
    <main style={{ minHeight: '80vh' }}><Outlet/></main>
    <Footer/>
    </div>

  )
}

export default function LayoutWithProvider(props) {
  return (
    <AppProvider>
      <Layout {...props} />
    </AppProvider>
  );
}