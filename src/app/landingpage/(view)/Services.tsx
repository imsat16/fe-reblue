import React from 'react'
import ServiceItem from './services.json'

const ServicesViews = () => {
  return (
    <section id='services' className='min-h-screen text-white bg-gradient-to-br flex items-center justify-center from-[#119BFF] to-[#5DC7DE]'>
        <div className="flex flex-col gap-5 px-4">
            <div className="flex flex-col">
                <h2 className='text-4xl font-semibold'>Layanan</h2>
                <p className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
            <div className="w-[90vw] bg-white flex gap-5 p-4 overflow-x-scroll rounded-md">
                {
                    ServiceItem.map((_,i)=>{
                        return(
                            <div key={i} className="card flex flex-col justify-center w-[65vw] min-w-[65vw] md:w-[45vw] md:min-w-[45vw] lg:w-[23vw] lg:min-w-[23vw] bg-gradient-to-br  from-[#119BFF] to-[#5DC7DE] p-4 rounded-md">
                                <h2 className='text-xl font-semibold'>{_.title}</h2>
                                <p className='text-sm'>{_.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default ServicesViews