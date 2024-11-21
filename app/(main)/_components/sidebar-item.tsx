"use client"

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
        icon: LucideIcon
        label: string
        href: string
    }

const SidebarItem = ({ icon: Icon, label, href } : Props) => {

    const router = useRouter()
    const pathName = usePathname()
    
    const isActive = (pathName === "/") && (href === "/") ||
                    pathName === href ||
                    pathName.startsWith(`${href}/`)
  return (
    <button className={cn(
            "flex itemc-center gap-x-2 text-muted-foreground text-sm pl-6 transition-all hover:bg-muted/40 font-[500]",
            isActive && "text-muted-foreground bg-muted hover:bg-muted"
        )}
    >
        <div className='flex items-center gap-x-2 py-4'>
            <Icon className={cn(
                "text-muted-foreground",
                isActive && "text-muted-foreground"
            )}/>
            {label}
            
        </div>
        <div className={cn(
            "ml-auto opacity-0 border-2 border-muted-foreground h-full transition-all",
            isActive && "opacity-100"
        )}/>
    </button>
  )
}

export default SidebarItem