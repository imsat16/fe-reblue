import Image from 'next/image'
import React from 'react'
import Trash from './trash.json'

const TrashViews = () => {
  return (
    <section id='trash' className='min-h-screen flex flex-col gap-5 px-4 justify-center container mx-auto text-sky-500'>
        <div className="flex flex-col">
            <h2 className='text-4xl font-semibold'>Type of Trash</h2>
            <p className='text-sm'>Jenis sampah yang kami terima</p>
        </div>
        <div className="inline-grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
            {
                Trash.map((_,i)=>{
                    return (
                        <div key={i} className="border flex flex-col md:flex-row justify-center md:justify-start items-center rounded-lg min-h-[20vh]">
                            <div className="relative min-w-[10vw] min-h-[10vh]">
                                <Image src={_.img} alt='logo' fill className='object-contain'/>
                            </div>
                            <h3 className='text-2xl font-semibold '>{_.title}</h3>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default TrashViews