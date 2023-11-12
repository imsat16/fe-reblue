import Botnav from '@/components/Botnav'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const MessagePage = () => {
  return (
    <main className='flex flex-col md:flex-row gap-4 relative'>
      <Sidebar/>
      <div className="">
        message
      </div>
      <Botnav/>
    </main>
  )
}

export default MessagePage
