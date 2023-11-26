'use client'

import { roles } from '@/api/api'
import { useRouter } from 'next/navigation'
import React from 'react'
import MenuTab from "./tab.json"
import { getUserData } from '@/api/user'
import Link from 'next/link'

const AdminPages = () => {
  const [data, setData] = React.useState([])
  const [active, setActive] = React.useState(0)
  
  const router = useRouter()

  React.useEffect(()=>{
    roles !== 'admin' && router.back()
  },[])
  React.useEffect(()=>{
    getData()
  },[])
  
  function getData(status?:string, id?:string) {
    getUserData(status, id)
    .then((res:any)=>{
      setData(res.data)
    })
  }

  return (
    <div className='w-full flex flex-col gap-5 p-4 bg-white rounded-lg'>
      <div className="flex gap-3">
        {
          MenuTab.map((item:any, index:any)=>{
            const {label, status} = item
            return (
              <div 
                key={item} 
                className={`hover:text-blue-400 hover:border-b-2 hover:border-blue-400 ${active === index ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-500'}`}
                onClick={()=>{
                  getData(item?.status)
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
      <div className="flex flex-wrap gap-3">
        {data.map((value, index) => {
          const {role, name, phone_number, _id} = value
          return(
            <Link href={`/home/admin/${_id}`} key={index} className="bg-slate-200 w-full lg:w-auto p-2 px-4 rounded-lg text-sm">
              <div className="flex gap-3 items-center justify-between">
                <h4 className='font-medium text-base'>{name}</h4>
                <p>{role}</p>
              </div>
              <p>{phone_number}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AdminPages