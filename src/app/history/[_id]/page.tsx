'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getDetailReq } from '@/api/request'
import Image from 'next/image'
import { roles } from '@/api/api'
import moment from 'moment'
import { cancelRequest, confirmRequest, doneRequest } from '@/api/picker'

const Details = () => {
  const router = useRouter();
  const pathname = usePathname()
  const path  = pathname.slice(9, pathname.length);

  const [data, setData]:any = React.useState()

  const [openPreview, setOpenPreview] = React.useState(false)
  const [openDetails, setOpenDetails] = React.useState(false)


  React.useEffect(() => {
    MyReqStatus()
  }, [])

  async function MyReqStatus() {
    getDetailReq(path).then((res: any) => {
      setData(res.data);
    }).catch((err) => {
      console.error(err)
    })
  }

  function Confirm() {
    confirmRequest(path)
    .then(()=>{
      MyReqStatus()
    })
    .catch((error)=>{
    })
  }

  async function Done() {
    doneRequest(path)
    .then(()=>{
      MyReqStatus()
    })
    .catch((error)=>{
      console.error(error)
    })
  }

  async function Cancel() {
    cancelRequest(path)
    .then(()=>{
      router.back()
    })
    .catch((error)=>{
      console.error(error)
    })
  }

  return (
    <main className='flex flex-col md:flex-row gap-4 relative'>
      {
        openPreview &&
        <div
          onClick={() => setOpenPreview(false)}
          className="bg-black/60 fixed left-0 z-10 w-full min-h-screen flex items-center justify-center"
        >
          <div
            onClick={() => setOpenPreview(false)}
            className="absolute top-10 right-10 cursor-pointer text-white"
          >
            close
          </div>
          <div className="max-h-[90vh] max-w-[90vw] w-full h-full p-64 relative">
            <Image
              onClick={() => setOpenPreview(false)}
              fill
              className='object-contain w-full h-full rounded-lg'
              src={data?.image.url}
              alt="Gambar"
            />
          </div>
        </div>
      }
      <div className="p-11 px-8 w-full">
          <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row gap-4">
            <div className="w-full flex flex-col gap-3">
              <div className="relative w-full flex-1 aspect-video">
                <Image
                  onClick={() => setOpenPreview(true)}
                  src={data?.image.url}
                  alt=''
                  fill
                  className='object-cover rounded-md cursor-pointer'
                />
              </div>
              <div className=" flex flex-col gap-3">
              {roles === 'picker' && data?.status === 'Waiting' &&
                <button onClick={Confirm} className='bg-blue-300 p-2 rounded-md'>
                  Ambil
                </button>
              }
              {data?.status === 'Picked' &&
                <button onClick={Done} className='bg-green-400 border-2 text-green-100 hover:text-green-600 hover:border-green-400 hover:bg-green-300 p-2 rounded-md'>
                  Selesai
                </button>
              }
              { roles === 'user' && data?.status === 'Waiting'
                && <button onClick={Cancel} className='bg-red-400 p-2 rounded-md'>
                Batalkan
                </button>
              }

              {data?.status === 'Done' && roles === 'user' && <div className='bg-green-400 p-2 rounded-md'>
                Barang sudah selesai diantarkan
              </div>
              }
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className='text-3xl font-medium'>#{data?.code_transaction}</h3>
                    <p className="text-xs">
                      {data?.status}
                    </p>
                  </div>
                  <p>{moment(data?.request_time).format("DD-MM-YYYY")}</p>
                </div>
                
                <div className="flex flex-col text-sm">
                  <table>
                    <tr>
                      <td>Nama</td>
                      <td>: {data?.user_id.name}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>: {data?.user_id.phone_number}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>: {data?.location_id.address}</td>
                    </tr>
                  </table>
                </div>

                <div className='text-xl font-medium flex gap-2'>
                  <div onClick={()=>setOpenDetails(!openDetails)} className="cursor-pointer bg-slate-300 rounded-md p-1 px-3">
                    {data?.items.length} Items
                  </div>
                  <div className="bg-slate-300 rounded-md p-1 px-3">
                    {data?.weight_total} Kg
                  </div>
                </div>

                {openDetails && <div className="bg-slate-200 p-2 rounded-md">
                  {data?.items.map((_:any, i:any)=>{
                    const {item_id} = _
                    return(
                      <div key={i} className="bg-white p-2 rounded-md ">
                        <strong className="">
                          {item_id?.name}
                        </strong>
                        <p className="text-xs">
                          Berat : {_.weight} Kg
                        </p>
                      </div>
                    )
                  })}
                </div>}
              </div>
            </div>
          </div>
      </div>
    </main>
  )
}

export default Details