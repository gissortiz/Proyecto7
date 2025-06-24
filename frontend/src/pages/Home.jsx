import React from 'react'
import ServiceList from '../components/ServiceList';

const Home = () => {
  return (
    <div>
      <h1 style={{textAlign:'center', margin:'1rem 0'}}>Catálogo de Servicios</h1>
      <ServiceList />
    </div>
  )
}

export default Home