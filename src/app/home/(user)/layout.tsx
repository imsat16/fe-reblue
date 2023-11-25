'use client'

import { roles } from '@/api/api'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    React.useEffect(() => {
        roles === 'admin' && router.replace('/categories')
        roles === 'picker' && router.replace('/home/picker')
        roles !== 'user' && router.back()
    }, [])
    return (
        <section>
            {children}
        </section>
    )
}