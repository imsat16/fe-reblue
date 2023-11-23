"use client"
import React from 'react'
import { login, verif } from '@/api/auth'
import { useRouter } from 'next/navigation'
import { parseCookies, setCookie } from 'nookies'
import Link from 'next/link'

const AuthPages = () => {
    const router = useRouter();
    const [tlp, setTlp] = React.useState<string>("")
    const [otp, setOtp] = React.useState<string>("")
    const [step, setStep] = React.useState<boolean>(false)
    const [load, setLoad] = React.useState<boolean>(false)
    const [msg, setMsg] = React.useState<string>("")
    const [msgColor, setMsgColor] = React.useState<string>("")

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

    React.useEffect(()=>{
        if (tlp.startsWith('0')) {
            // Gantilah angka 0 di awal dengan kode negara yang Anda inginkan
            const countryCode = '62'; // Ganti dengan kode negara yang sesuai
            const newTlp = countryCode + tlp.substring(1);
            setTlp(newTlp);
          }
    },[tlp])

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setLoad(true)
        console.log(tlp)

        login({
            phone_number: tlp
        }).then(
            res => {
                // console.log("berhasil")
                setLoad(false)
                setMsg(res.message)
                setMsgColor("bg-green-400")

                setTimeout(() => {
                    setMsg("")
                    setStep(true)
                }, 2000);
                // router.push('/verify', { scroll: false })
            }
        ).catch((err) => {
            setLoad(false)
            setMsgColor("bg-red-400")

            console.error("error bro")
        })
    }

    const handleVerify = async (e:any) => {
        e.preventDefault();
        setLoad(true)

        verif({
            phone_number: tlp,
            otp: otp
        }).then(
            res => {
                setLoad(false)
                setMsg(res.message)
                setMsgColor("bg-green-400")
                setCookie(null, 'token', res.token,{
                    maxAge: 24 * 60 * 60,
                })

                setTimeout(()=>{
                    setCookie(null, 'token', res.token,{
                        maxAge: 24 * 60 * 60,
                    })
                }, 0);

                window.location.href = '/home';
            }
        ).catch((err) => {
            setLoad(false)
            setMsgColor("bg-red-400")
            console.error(err.message)
        })
    }

  return (
    <div className=''>
        <div className="bg-blue-500 h-screen flex items-center justify-center">
            <div className="bg-white lg:max-w-[40vw] p-4 rounded-md flex flex-col gap-4">
                {msg&&
                    <div className="bg-blue-400 text-center text-sm p-2">
                        {msg}
                    </div>
                }
                {
                    !step ? 
                    <form 
                        onSubmit={handleSubmit} 
                        className={` flex flex-col gap-3`}
                    >
                        <label htmlFor="">Nomor Telepon</label>
                        <input 
                            onChange={(e:any)=>setTlp(e.target.value)} 
                            type='tel' 
                            inputMode='tel'
                            placeholder='+62' 
                            className='border p-2 rounded-md'
                        />
                        <button disabled={load} className={`bg-blue-400 p-2 rounded-md text-white ${load && 'opacity-60'}`} type='submit'>{load?'Loading...':'Masuk'}</button>
                    </form>
                    :
                    <form onSubmit={handleVerify} className="flex flex-col gap-3">
                        <label htmlFor="">Nomor Telepon</label>
                        <input disabled onChange={(e:any)=> setTlp(e.target.value)} type='tel' placeholder='+62' className='border p-2 rounded-md'/>
                        <label htmlFor="">OTP</label>
                        <input type='tel' onChange={(e:any)=> setOtp(e.target.value)} placeholder='Kode OTP anda' className='border p-2 rounded-md'/>
                        <button disabled={load} onClick={handleVerify} className={`bg-blue-400 p-2 rounded-md text-white ${load && 'opacity-60'}`} type='submit'>{load?'Loading...':'Verifikasi Otp'}</button>
                        <button onClick={handleSubmit} className='text-sm' type='button'>Kirim ulang kode OTP</button>
                    </form>
                }
                <p className='text-sm'>Belum memiliki akun? <Link href={'/signup'}><span className='font-semibold'>Daftar</span></Link></p>
            </div>

        </div>
    </div>
  )
}

export default AuthPages