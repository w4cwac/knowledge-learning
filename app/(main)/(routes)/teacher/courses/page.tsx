import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <Link href={"/teacher/create"}>
            <Button className='hover:bg-bleu/50' variant={"outline"}>
                <PlusCircle className='mr-2 h-4 w-4'/>
                Créer un cours
            </Button>
        </Link>
    </div>
  )
}

export default page