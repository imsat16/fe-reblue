import React from 'react'
import MenuTab from "./tab.json"

const PickerPages = () => {
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
                          // className={`hover:text-blue-400 hover:border-b-2 hover:border-blue-400 ${active === index ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-500'}`}
                          // onClick={()=>{
                            // getMyReq(item?.status)
                            // item?.status === undefined ? getMyReq() : MyReqStatus(item?.status),
                            // setActive(index)
                          // }}
                        >
                          <p className="cursor-pointer">{item.label}</p>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="flex flex-wrap gap-4">
                  lorem
                </div>
              </div>
            </div>
        </div>
        {/* <Botnav/> */}
    </main>
  )
}

export default PickerPages