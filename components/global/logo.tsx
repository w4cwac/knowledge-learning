import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
        <Link href={"/"}>
            <Image src={"/logo_knowledge.jpg"} alt='knowledge logo' className='object-cover' width={80} height={80} />
        </Link>
    </div>
  )
}

export default Logo