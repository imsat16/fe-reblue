"use client"
import { addCategory, getAllCategories } from '@/api/categories'
import Link from 'next/link'
import React from 'react'
import { IoClose } from 'react-icons/io5'

const CategoriesPages = () => {
  const [data, setData] = React.useState([])
  const [openAdd, setOpenAdd]:any = React.useState(false)
  const [name, setName]:any = React.useState("")

  React.useEffect(() => {
    getData()
  }, [])

  async function getData() {
    getAllCategories().then((res)=>{
      setData(res.data)
    })
  }

  async function handleAdd(e:React.FormEvent) {
    e.preventDefault()
    addCategory({name:name})
      .then((res)=>{
        getData()
        setOpenAdd(false)
    }).catch((err)=>{
      console.error(err)
    })
  }
  
  return (
    <div className='w-full flex flex-col gap-5 p-4 bg-white rounded-lg'>
      {
        openAdd && <div className="absolute bg-black/30 w-full px-4 h-screen flex items-center justify-center left-0 top-0">
        <div className="bg-white flex flex-col gap-2 rounded-lg w-full md:w-1/2 lg:w-1/3 p-4">
          <button onClick={()=>setOpenAdd(false)} className="flex justify-between">
            <p>Tambah Category</p>
            <IoClose />
          </button>
          <hr />
          <form 
            onSubmit={handleAdd}
            className='flex flex-col lg:flex-row gap-3'
          >
            <input 
              type="text" 
              onChange={(e)=>setName(e.target.value)} 
              placeholder='Nama Category'
              className='bg-slate-200 p-2 rounded-md border w-full'
            />
            <button 
              type='submit'
              onSubmit={handleAdd}
              className='p-2 bg-green-200 border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-300'
            >
              Tambahkan
            </button>
          </form>
        </div>
      </div>
      }
      <div className="flex justify-between">
        <h2>Item Category</h2>
        <button 
          type='button'
          onClick={()=>setOpenAdd(true)} 
          className='p-2 bg-green-200 border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-300'
        >
          Tambah Item
          </button>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap justify-between md:justify-normal gap-2">
        {data.map((_:any,i:any)=>{
          const {name} = _
          return(
            <Link href={`/categories/${_._id}`} key={i} className="min-w-[calc(50%-.5rem)] md:min-w-[15vw] flex items-center justify-center px-2 p-1 bg-slate-200 rounded-md h-20">
              {name}
            </Link>)
        })}
      </div>
    </div>
  )
}

export default CategoriesPages