'use client'
import { changeLocation, createLocation, getDetailLocation, getMyLocation, removeLocation } from '@/api/location'
import { changeInfo, changePict, getMyProfile } from '@/api/profile'
import { IoClose } from "react-icons/io5";
import Botnav from '@/components/Botnav'
import Sidebar from '@/components/Sidebar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import React from 'react'
import { BiImageAdd } from 'react-icons/bi';
import { roles } from "@/api/api"

const ProfilePages = () => {  
  const router = useRouter()
  const [data, setData]:any = React.useState()
  const [locData, setLocData] = React.useState([])
  const [detailsLoc, setdetailsLoc]:any = React.useState()

  const [id, setId] = React.useState()
  const [selected, setSelected]:any = React.useState()

  const [label, setLabel] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [note, setNote] = React.useState("")
  const [recipient, setRecipient] = React.useState("")
  const [contact, setContact] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [gender, setGender]:any = React.useState()

  const [openNewAddress, setOpenNewAddress] = React.useState(false)
  const [openDeleteLoc, setOpenDeleteLoc] = React.useState(false)
  const [openChangeAddress, setOpenChangeAddress] = React.useState(false)
  const [openUpdatePict, setOpenUpdatePict] = React.useState(false)
  const [openUpdateInfo, setOpenUpdateInfo] = React.useState(false)
  const [openLogout, setOpenLogout] = React.useState(false)
  
  const [msg, setMsg] = React.useState("")

  const [selectedImage, setSelectedImage] = React.useState(null)
  const [previewImage, setPreviewImage] = React.useState("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  React.useEffect(()=>{
    myProf()
    myLoc()
  },[])

  async function myLoc() {
    getMyLocation()
    .then((res:any)=>{
      setLocData(res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  async function myProf() {
    getMyProfile()
    .then((res:any)=>{
      setData(res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  async function detailLoc(id:string) {
    getDetailLocation(id)
    .then((res:any)=>{
      setdetailsLoc(res.data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const handleLogout = () => {
    destroyCookie(null, 'token', {
      path: '/'
    })
    window.location.href = '/';
  }

  function handleAddAddress(e:React.FormEvent){
    e.preventDefault();
    createLocation({
      label: label,
      address: address,
      note: note,
      recipient: recipient,
      contact: contact
    }).then((res: any) => {
      myLoc()
      setLabel("")
      setAddress("")
      setNote("")
      setRecipient("")
      setContact("")
      setOpenNewAddress(false)
      setMsg(res.message)
    }).catch((err) => {
      setMsg(err.message)
      console.error(err)
    })
  }

  function handleChangeAddress(e:React.FormEvent){
    e.preventDefault();
    changeLocation({
      label: label ? label : detailsLoc?.label,
      address: address ? address : detailsLoc?.address,
      note: note ? note : detailsLoc?.note,
      recipient: recipient ? recipient : detailsLoc?.recipient,
      contact: contact ? contact : detailsLoc?.contact
    }, detailsLoc?._id).then((res: any) => {
      myLoc()
      setLabel("")
      setAddress("")
      setNote("")
      setRecipient("")
      setContact("")
      setOpenChangeAddress(false)
      setMsg(res.message)
    }).catch((err) => {
      setMsg(err.message)
      console.error(err)
    })
  }
  
  function handleRemoveAddress(id:string){
    removeLocation(id)
    .then((res: any) => {
      myLoc()
      setOpenDeleteLoc(false)
      setMsg(res.message)
    }).catch((err) => {
      setMsg(err.message)
      console.error(err)
    })
  }

  function handleChangePict(e:React.FormEvent){
    e.preventDefault()
    changePict({
      avatar : selectedImage
    }).then((res:any)=>{
      myProf()
      setSelectedImage(null)
      setPreviewImage("")
      setOpenUpdatePict(false)
    }).catch((err)=>{
      alert(err.message)
    })
  }

  function handleChangeInfo(e:React.FormEvent){
    e.preventDefault();
    changeInfo({
      email: email,
      gender: gender
    }).then((res: any) => {
      myLoc()
      myProf()
      setEmail("")
      setGender("")
      setOpenUpdateInfo(false)
      setMsg(res.message)
      setTimeout(() => {
        setMsg("")
      }, 300);
    }).catch((err) => {
      setMsg(err.message)
      console.error(err)
    })
  }

  function handleRemovePict(){
    setPreviewImage("")
    setSelectedImage(null)
    // removeLocation(id)
    // .then((res: any) => {
    //   myLoc()
    //   setOpenDeleteLoc(false)
    //   setMsg(res.message)
    //   console.log(res.data);
    // }).catch((err) => {
    //   setMsg(err.message)
    //   console.error(err)
    // })
  }

  return (
    <main className='flex flex-col md:flex-row gap-4 relative'>
      {
        openNewAddress && (
          <div 
            className="fixed flex justify-center items-center w-screen z-10 bg-black/40 h-screen"
          >
            <form 
              onSubmit={handleAddAddress}
              className="bg-white w-5/6 lg:w-4/6 min-h-1/2 max-h-[80vh] overflow-y-auto p-4 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex justify-between sticky top-0 border-b pb-3">
                <div>Tambah alamat baru</div>
                <div 
                  onClick={()=>setOpenNewAddress(false)} 
                >
                  <IoClose />
                </div>
              </div>
              {
                msg && <div className="bg-red-200 text-red-600 p-2 rounded-md border border-red-600 text-sm">{msg}</div>
              }
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className='flex flex-col gap-1'>
                    <p className="after:content-['*'] after:ml-0.5 after:text-red-500">Label Alamat</p>
                    <input 
                      onChange={(e:any)=>setLabel(e.target.value)} 
                      className='border w-full rounded-lg p-2' 
                      placeholder='Label' 
                      type="text" 
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>Nama Penerima</p>
                    <input 
                      onChange={(e:any)=>setRecipient(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      placeholder="receptient" 
                      type="text" 
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>Nomor Hp</p>
                    <input 
                      onChange={(e:any)=>setContact(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      placeholder='Contact' 
                      type="text" 
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className='flex flex-col gap-1 w-full'>
                    <p className="after:content-['*'] after:ml-0.5 after:text-red-500">Alamat Lengkap</p>
                    <textarea
                      onChange={(e:any)=>setAddress(e.target.value)}
                      className="border w-full rounded-lg p-2" 
                      placeholder='Address' 
                      name="" 
                      id=""
                      required
                    >
                    </textarea>
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <p>Catatan untuk penjemput (optional)</p>
                    <textarea
                      onChange={(e:any)=>setNote(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      placeholder='Note' 
                      name="" 
                      id=""
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between sticky bottom-0">
                <span className='text-slate-500 text-xs'>Pastikan data yang di input valid</span>
                <div className="flex gap-2 text-sm">
                  <button 
                    onClick={()=>setOpenNewAddress(false)} 
                  >Batal</button>
                  <button className='bg-blue-200 text-blue-600 hover:bg-blue-300 active:bg-blue-400 active:text-blue-200 p-1 px-2 rounded-lg'>Simpan</button>
                </div>
              </div>
            </form>
          </div>
        )
      }
      {
        openChangeAddress && (
          <div 
            className="fixed flex justify-center items-center w-screen z-10 bg-black/40 h-screen"
          >
            <form 
              onSubmit={handleAddAddress}
              className="bg-white w-4/6 min-h-1/2 p-4 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex justify-between">
                <p>Edit alamat <span className='text-semibold'>{detailsLoc?.label}</span></p>
                <div 
                  onClick={()=>setOpenChangeAddress(false)} 
                >
                  x
                </div>
              </div>
              <hr />
              {
                msg && <div className="bg-red-200 text-red-600 p-2 rounded-md border border-red-600 text-sm">{msg}</div>
              }
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex gap-4">
                  <div className='flex flex-col gap-1'>
                    <p className="after:content-['*'] after:ml-0.5 after:text-red-500">Label Alamat</p>
                    <input 
                      onChange={(e:any)=>setLabel(e.target.value)} 
                      className='border w-full rounded-lg p-2' 
                      value={label ? label : detailsLoc?.label}
                      placeholder='Label' 
                      type="text" 
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>Nama Penerima</p>
                    <input 
                      onChange={(e:any)=>setRecipient(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      value={recipient ? recipient : detailsLoc?.recipient}
                      placeholder="receptient" 
                      type="text" 
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>Nomor Hp</p>
                    <input 
                      onChange={(e:any)=>setContact(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      value={contact ? contact : detailsLoc?.contact}
                      placeholder='Contact' 
                      type="text" 
                    />
                  </div>
                </div>
                <div className="flex gap-4 ">
                  <div className='flex flex-col gap-1 w-full'>
                    <p className="after:content-['*'] after:ml-0.5 after:text-red-500">Alamat Lengkap</p>
                    <textarea
                      onChange={(e:any)=>setAddress(e.target.value)}
                      className="border w-full rounded-lg p-2" 
                      value={address ? address : detailsLoc?.address}
                      placeholder='Address' 
                      name="" 
                      id=""
                      required
                    >
                    </textarea>
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <p>Catatan untuk penjemput (optional)</p>
                    <textarea
                      onChange={(e:any)=>setNote(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      value={note ? note : detailsLoc?.note}
                      placeholder='Note' 
                      name="" 
                      id=""
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className='text-slate-500 text-xs'>Pastikan data yang di input valid</span>
                <div className="flex gap-2 text-sm">
                  <button 
                    onClick={()=>setOpenChangeAddress(false)} 
                  >Batal</button>
                  <button 
                    onClick={handleChangeAddress} 
                    className='bg-green-200 text-green-600 hover:bg-green-300 active:bg-green-400 active:text-green-200 p-1 px-2 rounded-lg'
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
      }
      {
        openDeleteLoc && (
          <div 
            className="fixed flex justify-center items-center w-screen z-10 bg-black/40 h-screen"
          >
            <div 
              className="bg-white max-w-[65vw] p-4 flex flex-col gap-4 rounded-lg"
            >
              <p>Apakah anda yakin ingin menghapus lokasi <span className="font-medium">{selected?.label}</span>?</p>
            <hr />
              <div className="flex justify-end">
                <div className="flex gap-2 text-sm">
                  <button 
                    onClick={()=>setOpenDeleteLoc(false)} 
                  >Batal</button>
                  <button 
                    onClick={()=>handleRemoveAddress(selected._id)} 
                    className='bg-red-200 text-red-600 hover:bg-red-300 active:bg-red-400 active:text-red-200 p-1 px-2 rounded-lg'>Hapus</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        openUpdatePict && (
          <div 
            className="fixed flex justify-center items-center w-screen z-10 bg-black/40 h-screen"
          >
            <form 
              onSubmit={handleChangePict}
              className="bg-white p-4 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex justify-between">
                <p>Edit Profile Picture <span className='text-semibold'>{detailsLoc?.label}</span></p>
                <div 
                  onClick={()=>setOpenUpdatePict(false)} 
                >
                  <IoClose/>
                </div>
              </div>
              <hr />
              {
                msg && <div className="bg-red-200 text-red-600 p-2 rounded-md border border-red-600 text-sm">{msg}</div>
              }
              <div className="flex group flex-col gap-6 text-sm ">
                <div className="flex gap-4 relative h-[50vh] aspect-square ">
                {previewImage
                  ?
                  <Image
                    // onClick={() => setOpenPreview(true)}
                    fill
                    className='object-cover rounded-md'
                    src={previewImage}
                    alt="Gambar"
                  />
                  : 
                  <div
                    className='flex relative w-full items-center justify-center bg-gray-300 rounded-md '
                  >
                    <input 
                      type="file" 
                      required
                      className='w-full h-full bg-red-400 opacity-0 absolute' 
                      onChange={handleImageUpload} 
                    />
                    <p className={`${previewImage ? 'hidden group-hover:flex z-10' : 'flex'} flex-col items-center text-5xl`}>
                      <BiImageAdd />
                      <span className="text-base">{previewImage ? 'edit gambar' : 'tambah gambar'}</span>
                    </p>
                  </div>
                }
                </div>
              </div>
              <hr />
              <div className="flex justify-between">
              <button 
                    onClick={handleRemovePict} 
                    className='bg-red-200 text-sm text-red-600 hover:bg-red-300 active:bg-red-400 active:text-red-200 p-1 px-2 rounded-lg'
                  >
                    Hapus Gambar
                  </button>
                <div className="flex gap-2 text-sm">
                  <button 
                    type='submit'
                    className='bg-green-200 text-green-600 hover:bg-green-300 active:bg-green-400 active:text-green-200 p-1 px-2 rounded-lg'
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
      }
      {
        openUpdateInfo && (
          <div 
            className="fixed flex justify-center items-center w-screen z-10 bg-black/40 h-screen"
          >
            <form 
              onSubmit={handleChangeInfo}
              className="bg-white w-4/6 min-h-1/2 p-4 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex justify-between">
                <p>Edit Info</p>
                <div 
                  onClick={()=>setOpenUpdateInfo(false)} 
                >
                  x
                </div>
              </div>
              <hr />
              {
                msg && <div className="bg-red-200 text-red-600 p-2 rounded-md border border-red-600 text-sm">{msg}</div>
              }
              <div className="flex flex-col gap-6 text-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className='flex flex-col gap-1'>
                    <p className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</p>
                    <input 
                      onChange={(e:any)=>setEmail(e.target.value)} 
                      className='border w-full rounded-lg p-2' 
                      value={email ? email : detailsLoc?.email}
                      placeholder='example@doe.com' 
                      type="email" 
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p>Gender</p>
                    <select 
                        name="" 
                        id=""
                        onChange={(e:any)=>setGender(e.target.value)}
                      >
                      <option 
                        disabled
                        selected={true}
                        value=""
                      >
                        Select
                      </option>
                      <option 
                        value="Pria"
                      >
                        Pria
                      </option>
                      <option 
                        value="Wanita"
                      >
                        Wanita
                      </option>
                    </select>
                    {/* <input 
                      onChange={(e:any)=>setGender(e.target.value)}
                      className='border w-full rounded-lg p-2' 
                      value={gender ? gender : detailsLoc?.gender}
                      placeholder="Pria/Wanita" 
                      type="text" 
                      required
                    /> */}
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-3 md:flex-row justify-between">
                <span className='text-slate-500 text-xs'>Pastikan data yang di input valid</span>
                <div className="flex justify-between md:justify-normal gap-2 text-sm">
                  <button 
                    onClick={()=>setOpenChangeAddress(false)} 
                  >Batal</button>
                  <button 
                    onClick={handleChangeInfo} 
                    className='bg-green-200 text-green-600 hover:bg-green-300 active:bg-green-400 active:text-green-200 p-1 px-2 rounded-lg'
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
      }
      {
        openLogout && (
          <div 
            className="fixed flex justify-center items-center w-screen z-10 bg-black/40 h-screen"
          >
            <div 
              className="bg-white max-w-[65vw] p-4 flex flex-col gap-4 rounded-lg"
            >
              <p>Apakah anda yakin ingin Keluar?</p>
            <hr />
              <div className="flex justify-end">
                <div className="flex gap-2 text-sm">
                  <button 
                    onClick={()=>setOpenLogout(false)} 
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className='bg-red-200 text-red-600 hover:bg-red-300 active:bg-red-400 active:text-red-200 p-1 px-2 rounded-lg'>Keluar</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
        <Sidebar/>
          <div className="p-11 px-8 w-full flex flex-col lg:flex-row gap-4 text-sm">
            {/* {JSON.stringify(data)} */}
              <div className="relative">
                <div className="bg-white p-4 sticky top-5 flex flex-col items-center gap-4 rounded-lg">
                  {data?.avatar ?
                    <div className="w-1/2 lg:w-[15vw] aspect-square relative rounded-lg">
                      {data?.avatar && <Image
                        src={data?.avatar.url}
                        alt='profile'
                        fill 
                        className="w-full h-full object-cover rounded-lg"
                      />}
                    </div>
                  :
                  <div className="bg-slate-300 w-[15vw] animate-pulse aspect-square relative rounded-lg">
                    
                  </div>
                  }
                  <div className="flex justify-center flex-wrap lg:flex-col w-full gap-4 text-center">
                    <div className="flex gap-2 lg:flex-col lg:gap-4 w-full">
                      <button onClick={()=>setOpenUpdatePict(true)} className="bg-green-200 w-full text-green-600 p-2 rounded-md">Update Picture</button>
                      <button onClick={()=>setOpenUpdateInfo(true)} className="bg-blue-200 w-full text-blue-600 p-2 rounded-md">Update Info</button>
                    </div>
                    <button
                      type="button" 
                      onClick={()=>setOpenLogout(true)}
                      className="bg-red-200 text-red-600 p-2 rounded-md w-full"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full pb-8">
                <div className="bg-white p-4 flex flex-col gap-6 rounded-lg">
                  <div className="">
                    <h2 className='text-2xl font-medium'>John doe profile</h2>
                    <div className="flex justify-between">
                      <table>
                        <tbody>
                          <tr>
                            <td>Nama</td>
                            <td>: {data && data?.user_id.name}</td> 
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>: {data ? data?.gender : 'none'}</td> 
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>: +{data && data?.user_id.phone_number}</td> 
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>: {data ? data?.email : 'none'}</td> 
                          </tr>
                        </tbody>
                      </table>
                      {/* <div className="flex flex-col items-center">
                        <div className="bg-blue-400 w-16 h-16">

                        </div>
                        <p className='font-medium'>Beginer</p>
                      </div> */}
                    </div>
                  </div>
                  {
                    roles === 'user' && (<div className="flex flex-col gap-4">
                      <div className="flex items-end justify-between">
                        <div className="text-medium font-semibold">Alamat</div>
                        <button type='button' onClick={()=>setOpenNewAddress(true)} className="p-2 bg-[#3CC462] rounded-md text-white">Tambah alamat Baru</button>
                      </div>
                      <div className="flex flex-col gap-1">
                        {
                          locData?.map((_:any, i:any)=>{
                            const {label, recipient, contact, address} = _
                            return (
                              <div key={i} className="flex flex-col gap-2 p-4 border border-black/50 rounded-lg">
                                <div className="flex flex-col gap-">
                                  <p className='text-sm font-semibold'>{label}</p>
                                  <p className='text-medium font-semibold'>{recipient}</p>
                                  {
                                    contact && <p>{contact}</p>
                                  }
                                  <p className='line-clamp-1'>{address}</p>
                                </div>
                                <div className="flex gap-4 text-xs font-semibold">
                                  <button onClick={()=>{setOpenDeleteLoc(true), setSelected(_)}}>Hapus</button>
                                  <button onClick={()=>{setOpenChangeAddress(true), detailLoc(_._id)}}>Ubah Alamat</button>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>)
                  }
                </div>
              </div>
          </div>
        <Botnav/>
    </main>
  )
}

export default ProfilePages