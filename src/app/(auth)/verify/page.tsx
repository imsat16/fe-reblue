"use client"
import { verif } from '@/api/auth';
import { useRouter } from 'next/navigation';
import React from 'react'

const VerifOtp = () => {
    const router = useRouter();

    const [tlp, setTlp] = React.useState<string>("")
    const [otp, setOtp] = React.useState<string>("")

    React.useEffect(() => {
      const tel = localStorage.getItem("phone")
    
      tel === null && router.back()
    }, [])
    
    const handleSubmit = (e:any) => {
        e.preventDefault();

        verif({
            phone_number: tlp,
            otp: otp
        }).then(
            res => {
                console.log("berhasil")
            }
        ).catch((err) => {
            console.error("error bro")
        })
    }
  return (
    <div className=''>
        <div className="bg-blue-500 h-screen flex items-center justify-center">
            <div className="bg-white p-4 rounded-md px-4 flex flex-col gap-3">
                <label htmlFor="">Nomor Telepon</label>
                <input onChange={(e:any)=> setTlp(e.target.value)} type='tel' placeholder='+62' className='border p-2 rounded-md'/>
                <label htmlFor="">OTP</label>
                <input type='tel' onChange={(e:any)=> setOtp(e.target.value)} placeholder='Kode OTP anda' className='border p-2 rounded-md'/>
                <button className='bg-blue-400 p-2 rounded-md text-white' type='submit' onSubmit={handleSubmit}>Masuk</button>
                <button className='text-sm' type='submit'>Kirim ulang kode OTP</button>
            </div>
        </div>
    </div>
  )
}

export default VerifOtp