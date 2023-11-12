import Botnav from '@/components/Botnav'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const ProfilePages = () => {
  return (
    <main className='flex flex-col md:flex-row gap-4 relative'>
        <Sidebar/>
        <div className="">
            prof
        </div>
        <Botnav/>
    </main>
  )
}

export default ProfilePages