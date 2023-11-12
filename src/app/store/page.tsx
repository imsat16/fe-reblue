import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getData() {
    const res = await fetch(`https://fakestoreapi.com/products`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

const StorePages = async() => {
const data = await getData()

  return (
    <div className='min-h-screen'>
        <div className="container flex mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mx-4">
                {data.map((_:any, i:number) => {
                    const {id, title, image, price} = _
                    return (
                        <Link key={i} href={`/store/${id}`} className="w-full justify-between items-center flex flex-col gap-3 min-h-[30vh] border-2 rounded-md p-4 ">
                            <div className="flex flex-col gap-4">
                                <div className="relative w-full h-[20vh]">
                                    <Image 
                                        src={image}
                                        alt={title}
                                        fill
                                        className='object-contain w-full h-full'
                                    />
                                </div>
                            </div>
                            <p className='text-xs font-semibold line-clamp-2'>{title}</p>
                            <p className='text-sm font-semibold'>{price}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default StorePages