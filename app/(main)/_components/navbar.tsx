import NavbarRoutes from '@/components/global/navbar-routes'
import React from 'react'
import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
  return (
    <div className='p-6 border-b h-full shadow-sm backdrop-blur-sm flex items-center'>
        <MobileSidebar />
        <NavbarRoutes />
    </div>
  )
}

export default Navbar