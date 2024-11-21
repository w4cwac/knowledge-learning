import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

type Props = {
    message?: string | null
}
const FormError = ({ message }: Props) => {
    if (!message) return null
    return (
        <div className='bg-rouge/15 flex items-center gap-x-2 p-3 text-sm text-rouge'>
            <FaExclamationTriangle className='w-4 h-4e' />
            <p>{message}</p>
        </div>
    )
}

export default FormError