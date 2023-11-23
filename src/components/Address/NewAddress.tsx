'use client'
import React from 'react'

const NewAddress = (opened:boolean) => {
  const [open, setOpen] = React.useState(opened)

  const handleClick = () => {
    setOpen(!open); // Toggle the open state
    console.log({opened, open})
  };

  return (
    <div onClick={handleClick} className='fixed w-screen z-10 bg-black/40 h-screen'>NewAddress</div>
  )
}

export default NewAddress