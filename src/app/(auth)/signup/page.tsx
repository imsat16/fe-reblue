"use client"
import React from 'react'
import { signup } from '@/api/auth'
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import Link from 'next/link';

const AuthPages = () => {
    const router = useRouter();
    const [name, setName] = React.useState<string>("")
    const [tlp, setTlp] = React.useState<string>("")

    const cookies = parseCookies()
    const token = cookies.token;

    React.useEffect(() => {
        if(token){
            router.push("/home")
            return;
        } else {
            return;
        }
    }, [token, router])

    const handleSubmit = (e:any) => {
        e.preventDefault();
        localStorage.setItem("phone", tlp)

        signup({
            name: name,
            phone_number: tlp
        }).then(
            res => {
                console.log("berhasil")
                router.push('/verify', { scroll: false })
            }
        ).catch((err) => {
            console.error("error bro")
        })
    }
  return (
    <div className=''>
        <div className="bg-blue-500 h-screen flex items-center justify-center">
            <div className="bg-white lg:max-w-[40vw] p-4 rounded-md flex flex-col gap-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label htmlFor="">Nama</label>
                    <input onChange={(e:any)=>setName(e.target.value)} type='tel' placeholder='John doe' className='border p-2 rounded-md'/>
                    <label htmlFor="">Nomor Telepon</label>
                    <input onChange={(e:any)=>setTlp(e.target.value)} type='tel' placeholder='+62' className='border p-2 rounded-md'/>
                    <button className='bg-blue-400 p-2 rounded-md text-white' type='submit'>Masuk</button>
                </form>
                <p className='text-sm'>Punya akun? <Link href={'/login'}><span className='font-semibold'>Masuk</span></Link></p>
            </div>
        </div>
    </div>
  )
}

export default AuthPages