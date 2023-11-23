"use client"
import React from 'react'
import { signup, verif } from '@/api/auth'
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import Link from 'next/link';

const AuthPages = () => {
    const router = useRouter();

    const [step, setStep] = React.useState<boolean>(false)
    const [msg, setMsg] = React.useState<string>("")
    const [load, setLoad] = React.useState<boolean>(false)

    const [name, setName] = React.useState<string>("")
    const [tlp, setTlp] = React.useState<string>("")
    const [otp, setOtp] = React.useState<string>("")

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
            phone_number: tlp,
            // role: 'admin'
        }).then(
            res => {
                // router.push('/verify', { scroll: false })
                setTimeout(() => {
                    setMsg("")
                    setStep(true)
                }, 4000);
            }
        ).catch((err) => {
            console.error("error bro")
        })
    }

    const handleVerify = (e:any) => {
        e.preventDefault();
        setLoad(true)

        verif({
            phone_number: tlp,
            otp: otp
        }).then(
            res => {
                // console.log(res.message)
                setLoad(false)
                setMsg(res.message)
                console.log(res.message)
                setCookie(null, 'token', res.token,{
                    maxAge: 24 * 60 * 60,
                })

                setTimeout(()=>{
                    setCookie(null, 'token', res.token,{
                        maxAge: 24 * 60 * 60,
                    })
                }, 0);

                window.location.href = '/home';
                // setMsgColor("bg-green-400")
                
                // setTimeout(() => {
                //     setCookie(null, 'token', res.token,{
                //         maxAge: 24 * 60 * 60,
                //         path: '/',
                //     })
                //     router.refresh()
                // }, 3000);
            }
        ).catch((err) => {
            setLoad(false)
            // setMsgColor("bg-red-400")
            console.error(err.message)
        })
    }
  return (
    <div className=''>
        <div className="bg-blue-500 h-screen flex items-center justify-center">
            <div className="bg-white lg:max-w-[40vw] p-4 rounded-md flex flex-col gap-4">
                {!step ? 
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label htmlFor="">Nama</label>
                        <input onChange={(e:any)=>setName(e.target.value)} type='tel' placeholder='John doe' className='border p-2 rounded-md'/>
                        <label htmlFor="">Nomor Telepon</label>
                        <input onChange={(e:any)=>setTlp(e.target.value)} type='tel' placeholder='+62' className='border p-2 rounded-md'/>
                        <button className='bg-blue-400 p-2 rounded-md text-white' type='submit'>Masuk</button>
                    </form>
                : 
                    <form onSubmit={handleVerify} className="flex flex-col gap-3">
                        <label htmlFor="">Nomor Telepon</label>
                        <input 
                            disabled 
                            value={tlp} 
                            type='tel' 
                            placeholder='+62' 
                            className='border p-2 rounded-md'
                        />
                        <label htmlFor="">OTP</label>
                        <input 
                            type='number' 
                            value={otp}
                            onChange={(e:any)=> setOtp(e.target.value)} 
                            placeholder='Kode OTP anda' 
                            className='border p-2 rounded-md'
                        />
                        <button disabled={load} onClick={handleVerify} className={`bg-blue-400 p-2 rounded-md text-white ${load && 'opacity-60'}`} type='submit'>{load?'Loading...':'Verifikasi Otp'}</button>
                        <button onClick={handleSubmit} className='text-sm' type='button'>Kirim ulang kode OTP</button>
                    </form>}
                <p className='text-sm'>Punya akun? <Link href={'/login'}><span className='font-semibold'>Masuk</span></Link></p>
            </div>
        </div>
    </div>
  )
}

export default AuthPages