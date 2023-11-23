'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { getDetailReq } from '@/api/request'

const Details = () => {
  const pathname = usePathname()
  const [data, setData] = React.useState([])

  const path  = pathname.slice(9, pathname.length);
  React.useEffect(() => {
    MyReqStatus()
  }, [])

  async function MyReqStatus() {
    getDetailReq(path).then((res: any) => {
      setData(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error
    })
  }
  return (
    <div>Details {path}</div>
  )
}

export default Details