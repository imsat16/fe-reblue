'use client'
import React from 'react'
import MenuTab from "./tab.json"
import { getReq } from '@/api/request'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

const PickerPages = () => {
  const [data, setData] = React.useState([])
  const [active, setActive] = React.useState(0)
  
  React.useEffect(() => {
    getAllRequest()
  }, [])
  

  async function getAllRequest(status?:string) {
    getReq(status ? status : 'Waiting')
    .then((res)=>{
      setData(res.data)
    })
  }

  return (
    <main className='flex flex-col md:flex-row gap-4 relative'>
        <div className="p-11 px-8 w-full">
            <div className="bg-white p-4 rounded-lg">
              <h2>Riwayat Aktivitas</h2>
              <div className="">
                <div className="flex gap-3 p-4">
                  {
                    MenuTab.map((item:any, index:any)=>{
                      return (
                        <div 
                          key={item} 
                          className={`hover:text-blue-400 hover:border-b-2 hover:border-blue-400 ${active === index ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-500'}`}
                          onClick={()=>{
                            getAllRequest(item?.status)
                            // item?.status === undefined ? getAllRequest() : MyReqStatus(item?.status),
                            setActive(index)
                          }}
                        >
                          <p className="cursor-pointer">{item.label}</p>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="flex flex-wrap gap-4">
                {data.map((_:any, i:any)=>{
                    return (
                      <div key={i} className="bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-lg w-full md:w-[48%]">
                        <div className="flex">
                          <div className="relative w-32 aspect-square h-full">
                            <Image
                              src={_.image.url}
                              alt={_.image.url}
                              fill
                              className="object-cover rounded-lg w-full h-full"
                            />
                          </div>
                          <div className="p-2 text-sm flex justify-between w-full">
                            <div className="">
                              <p className="font-semibold">
                                #{_?.code_transaction}
                              </p>
                              <p className="line-clamp-2">
                                {_?.location_id.address}
                              </p>
                              <div className="flex gap-1 text-xs">
                                <p>
                                  {_?.items.length} item
                                </p>
                                |
                                <p>
                                  {_?.weight_total} Kg
                                </p>
                              </div>
                              <p className="text-xs">
                                {moment(_?.request_time).format("DD-MM-YYYY")}
                              </p>
                            </div>
                            <div className=" flex flex-col justify-between">
                              <p>
                                {_?.status}
                              </p>
                              <Link href={`/history/${_?._id}`}>
                                details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
        </div>
        {/* <Botnav/> */}
    </main>
  )
}

export default PickerPages