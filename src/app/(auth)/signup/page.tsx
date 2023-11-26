"use client"
import React from 'react'
import { signup, verif } from '@/api/auth'
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

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

    React.useEffect(()=>{
        if (tlp.startsWith('0')) {
            // Gantilah angka 0 di awal dengan kode negara yang Anda inginkan
            const countryCode = '62'; // Ganti dengan kode negara yang sesuai
            const newTlp = countryCode + tlp.substring(1);
            setTlp(newTlp);
        }
    },[tlp])

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
        signup(
            {
                name: name,
                phone_number:tlp
            }
        ).then(
            res => {
                setTimeout(() => {
                    setMsg("")
                    setStep(true)
                }, 4000);
            }
        ).catch((err) => {
            setMsg(err.message)
            setTimeout(() => {
                setMsg("")
            }, 3000)
        })
        // phoneRegex.test(tlp)
        // ? 
        // signup({
        //     name: name,
        //     phone_number: tlp,
        //     // role: 'admin'
        // }).then(
        //     res => {
        //         setTimeout(() => {
        //             setMsg("")
        //             setStep(true)
        //         }, 4000);
        //     }
        // ).catch((err) => {
        //     setMsg(err.message)
        //     setTimeout(() => {
        //         setMsg("")
        //     }, 3000)
        // })
        // : (
        // setMsg("Nomor tidak berlaku di negara anda"),
        // setTimeout(() => {
        //     setMsg("")
        // }, 3000))
        
    }

    const handleVerify = (e:any) => {
        e.preventDefault();
        setLoad(true)

        verif({
            phone_number: tlp,
            otp: otp
        }).then(
            res => {
                setLoad(false)
                setMsg(res.message)
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
            <button onClick={()=>router.replace('/')} className='absolute top-2 left-2 flex items-center text-white'><MdArrowBack/>Back</button>
            <div className="bg-white lg:max-w-[40vw] p-4 rounded-md flex flex-col gap-4">
                {!step ? 
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label htmlFor="">Nama</label>
                        <input 
                            onChange={(e:any)=>setName(e.target.value)} 
                            type='text' 
                            placeholder='John doe' 
                            className='border p-2 rounded-md'
                        />
                        <label htmlFor="">Nomor Telepon</label>
                        <input 
                            onChange={(e:any)=>setTlp(e.target.value)} 
                            type='tel' 
                            placeholder='+62' 
                            className='border p-2 rounded-md' 
                            required
                        />
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
                {msg}
            </div>
        </div>
    </div>
  )
}

export default AuthPages