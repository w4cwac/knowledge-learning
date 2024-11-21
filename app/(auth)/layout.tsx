import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
}
const layout = ({ children } : Props) => {
  return (
    <div className='w-full h-full flex flex-col p-4 bg-white'>
        <Link
            href={"/"}
        
        >
            <Button
                variant={"outline"}
                className='rounded-full flex items-center bg-marine hover:bg-marine/60 border-bleu'
            >
                <ArrowBigLeft className='w-4 h-4 mr-1' />
                Retour à l'accueil
            </Button>
        </Link>
        {children}
    </div>
  )
}

export default layout
