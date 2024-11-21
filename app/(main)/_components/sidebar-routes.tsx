"use client"

import { BarChart, Layout, List } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import SidebarItem from './sidebar-item'

const homeRoutes = [
    {
        icon: Layout,
        label: 'Home',
        href: '/'
    },
    {
        icon: BarChart,
        label: 'Analytics',
        href: '/analytics'
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        href: '/teacher/courses'
    },
    {
        icon: BarChart,
        label: 'Teacher Analytics',
        href: '/teacher/analytics'
    }
]

const SidebarRoutes = () => {

    const pathName = usePathname()
    const isTeacher = pathName.includes('/teacher')

    const routes = isTeacher ? teacherRoutes : homeRoutes
  return (
    <div className='flex flex-col w-full'>
        {
            routes.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))
        }

    </div>
  )
}

export default SidebarRoutes