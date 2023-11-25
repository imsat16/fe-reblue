'use client'

import { roles } from '@/api/api'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminPages = () => {
  const router = useRouter()
  React.useEffect(()=>{
    roles !== 'admin' && router.back()
  },[])
  return (
    <div>AdminPages</div>
  )
}

export default AdminPages