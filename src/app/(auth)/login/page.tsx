"use client"
import React from 'react'
import { login } from '@/api/auth'
import { useRouter } from 'next/navigation'

const AuthPages = () => {
    const router = useRouter();
    const [tlp, setTlp] = React.useState<string>("")
    
    const handleSubmit = (e:any) => {
        e.preventDefault();

        // login({
        //     phone_number: tlp
        // }).then(
        //     res => {
        //         console.log("berhasil")
        //         router.push('/verify', { scroll: false })
        //     }
        // ).catch((err) => {
        //     console.error("error bro")
        // })
    }
  return (
    <div className=''>
        <div className="bg-blue-500 h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md px-4 flex flex-col gap-3">
                <label htmlFor="">Nomor Telepon</label>
                <input 
                    onChange={(e:any)=>setTlp(e.target.value)} 
                    type='tel' 
                    inputMode='tel'
                    placeholder='+62' 
                    className='border p-2 rounded-md'
                />
                <button className='bg-blue-400 p-2 rounded-md text-white' type='submit'>Masuk</button>
            </form>
        </div>
    </div>
  )
}

export default AuthPages