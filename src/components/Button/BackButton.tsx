'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()

    return (
        <button type='button' onClick={()=>router.back()}>
            Back
        </button>
    )
}

export default BackButton