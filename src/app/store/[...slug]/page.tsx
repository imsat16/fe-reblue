import BackButton from '@/components/Button/BackButton'
import useBackButton from '@/utils/backButton'
import Image from 'next/image'
import React from 'react'

async function getData(slug:string) {
    const res = await fetch(`https://fakestoreapi.com/products/${slug}`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function DetailsProduct({ params }: { params: { slug: string } }) {
    const {slug} = params
    const data = await getData(slug)
    const {title, description, price, category, rating, image} = data

    return (
        <div className='flex flex-col container mx-auto'>
            <BackButton/>
            <div className="flex gap-5 justify-between">
                <div className="">
                    <div className="w-52 h-52 relative">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className='object-contain'
                        />
                    </div>
                </div>
                <div className=" ">
                    <div className="flex flex-col ">
                        <h2 className='text-xl font-semibold'>{data.title}</h2>
                        <p>
                            <span>Terjual : {rating.count}</span>
                            <span> • </span>
                            <span>{rating.rate} ({rating.count})</span>
                        </p>
                        <h1 className='text-3xl font-bold'>
                            {price}00,-
                        </h1>
                    </div>
                </div>
                <div className="h-52 border-2 rounded-lg p-2 w-[22vw]">
                    <div className="flex flex-col">
                        <div className="">
                            <p className='font-bold'>Atur Jumlah dan catatan</p>
                            <p>XL</p> {/*ukuran*/}
                        </div>
                        <hr />
                        <div className="">
                            count
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }