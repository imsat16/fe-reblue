'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { changeUserData, getUserData } from '@/api/user'

interface UserData {
    name: string,
    phone_number: string
    role: string
}
const AdminPages = () => {
  const [data, setData] = React.useState<UserData | undefined>(undefined);
  const [roles, setRoles] = React.useState<string>("");
  const [msg, setMsg] = React.useState<string>("");
  
  const router = useRouter()
  const pathname = usePathname()
  const path = pathname.slice(12, pathname.length);

//   React.useEffect(()=>{
//     roles !== 'admin' && router.back()
//   },[])
  React.useEffect(()=>{
    getData()
  },[])
  
  async function getData() {
    getUserData('', path)
    .then((res:any)=>{
      setData(res.data)
    })
  }

  function changeRole(e:React.FormEvent) {
    e.preventDefault()
    changeUserData({
        role: roles
    },path)
    .then((res:any)=>{
        setMsg(res.message)
        getData()
        setTimeout(() => {
            setMsg("")
        }, 3000);
    })
    .catch((err:any)=>{
        console.error(err)
    })
  }

  const { name, role, phone_number } = data || {};

  return (
    <div className='w-full flex flex-col gap-5 p-4 bg-white rounded-lg'>
        {msg && <p className='bg-green-300 p-2'>{msg}</p>}
      <div className="flex flex-col gap-3">
        <p>{name} </p>
        <form onSubmit={changeRole} className='flex'>
            <select 
                name="" 
                id=""
                onChange={(e:any)=>setRoles(e.target.value)}
            >
                <option 
                    disabled
                    selected={true}
                    value=""
                >
                    {role}
                </option>
                <option 
                    value="user"
                >
                    User
                </option>
                <option 
                    value="picker"
                >
                    Picker
                </option>
                <option 
                    value="admin"
                >
                    Admin
                </option>
            </select>
            <button type='submit' onSubmit={changeRole}>
                Simpan
            </button>
        </form>
        <p>{phone_number}</p>
      </div>
    </div>
  )
}

export default AdminPages