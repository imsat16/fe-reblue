"use client"

import { MdArrowBack } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { changeCategories, deleteCategories } from '@/api/categories';
import { addItem, changeItem, deleteItem, getItemByCategory } from '@/api/item';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
const DetailsCategories = () => {
  const router = useRouter()
  const pathname = usePathname()
  const path:any  = pathname.slice(12, pathname.length);
  const [data, setData]:any = React.useState()
  const [name, setName]:any = React.useState("")

  const [selected, setSelected]:any = React.useState()

  const [openAdd, setOpenAdd]:any = React.useState(false)
  const [openDelCat, setOpenDelCat]:any = React.useState(false)
  const [openEditCat, setOpenEditCat]:any = React.useState(false)
  const [openDelIt, setOpenDelIt]:any = React.useState(false)
  const [openEditIt, setOpenEditIt]:any = React.useState(false)

  React.useEffect(() => {
    getItem()
  }, [])

  async function getItem() {
    getItemByCategory(path)
    .then((res)=>{
      setData(res.data)
    })
  }

  async function handleAdd(e:React.FormEvent) {
    e.preventDefault()
    addItem({
      category_id: path,
      name : name
    }).then((res)=>{
      getItem()
      setOpenAdd(false)
    })
    const x = { 
      name, path
    }
  }

  async function handleDeleteCategory() {
    deleteCategories(path)
    .then(()=>{
      router.replace('/categories')
    })
    .catch((err)=>{
      alert(err)
    })
  }

  async function handleDeleteItem() {
    deleteItem(selected?.item_id)
    .then(()=>{
      getItem()
      setOpenDelIt(false)
    })
    .catch((err)=>{
      alert(err)
    })
  }

  function handleChangeCategories(e:React.FormEvent){
    e.preventDefault();
    changeCategories({
      name: name
    }, path)
    .then((res: any) => {
      getItem()
      setOpenEditCat(false)
    }).catch((err) => {
      // setMsg(err.message)
      console.error(err)
    })
  }

  function handleChangeItem(e:React.FormEvent){
    e.preventDefault();
    changeItem({
      name: name
    }, selected?.item_id)
    .then((res: any) => {
      getItem()
      setOpenEditIt(false)
    }).catch((err) => {
      // setMsg(err.message)
      console.error(err)
    })
  }

  return (
    <div className='w-full flex flex-col gap-5 p-4 bg-white rounded-lg'>
      {
        openAdd && (
          <div className="absolute bg-black/30 w-full px-4 h-screen flex items-center justify-center left-0 top-0">
          <div className="bg-white flex flex-col gap-2 rounded-lg w-full md:w-1/2 lg:w-1/3 p-4">
            <button onClick={()=>setOpenAdd(false)} className="flex justify-between">
              <p>Tambah Item </p>
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
                placeholder='Nama Item'
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
        )
      }
      {
        openEditCat && (
          <div className="absolute bg-black/30 w-full px-4 h-screen flex items-center justify-center left-0 top-0">
          <div className="bg-white flex flex-col gap-2 rounded-lg w-full md:w-1/2 lg:w-1/3 p-4">
            <button onClick={()=>setOpenEditCat(false)} className="flex justify-between">
              <p>Edit Category {data?.category} </p>
              <IoClose />
            </button>
            <hr />
            <form 
              onSubmit={handleChangeCategories}
              className='flex flex-col lg:flex-row gap-3'
            >
              <input 
                type="text" 
                onChange={(e)=>setName(e.target.value)} 
                placeholder='Nama Item'
                className='bg-slate-200 p-2 rounded-md border w-full'
              />
              <button 
                type='submit'
                onSubmit={handleChangeCategories}
                className='p-2 bg-green-200 whitespace-nowrap border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-300'
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
          </div>
        )
      }
      {
        openEditIt && (
          <div className="absolute bg-black/30 w-full px-4 h-screen flex items-center justify-center left-0 top-0">
          <div className="bg-white flex flex-col gap-2 rounded-lg w-full md:w-1/2 lg:w-1/3 p-4">
            <button onClick={()=>setOpenEditIt(false)} className="flex justify-between">
              <p>Edit Item {selected?.name} </p>
              <IoClose />
            </button>
            <hr />
            <form 
              onSubmit={handleChangeItem}
              className='flex flex-col lg:flex-row gap-3'
            >
              <input 
                type="text" 
                onChange={(e)=>setName(e.target.value)} 
                placeholder='Nama Item'
                className='bg-slate-200 p-2 rounded-md border w-full'
              />
              <button 
                type='submit'
                onSubmit={handleChangeItem}
                className='p-2 bg-green-200 whitespace-nowrap border border-green-600 text-green-600 rounded-lg text-sm hover:bg-green-300'
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
          </div>
        )
      }
      {
        openDelCat && (
          <div className="absolute bg-black/30 w-full px-4 h-screen flex items-center justify-center left-0 top-0">
          <div className="bg-white flex flex-col gap-2 rounded-lg w-full md:w-1/2 lg:w-1/3 p-4">
            <button onClick={()=>setOpenDelCat(false)} className="flex justify-between">
              <p>Edit Item {data?.category} </p>
              <IoClose />
            </button>
            <hr />
            <div className="">
              Apakah anda yakin ingin menghapus Kategori <strong>{data?.category}</strong>
            </div>
            <hr />
              <div className="flex gap-3 justify-end">
                <button 
                  type='button'
                  onClick={()=>setOpenDelCat(false)}
                  className='p-2 whitespace-nowrap rounded-lg text-sm '
                >
                  Batal
                </button>
                <button 
                  type='button'
                  onClick={handleDeleteCategory}
                  className='p-2 bg-red-200 whitespace-nowrap border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-300'
                >
                  Hapus
                </button>
              </div>
          </div>
          </div>
        )
      }
      {
        openDelIt && (
          <div className="absolute bg-black/30 w-full px-4 h-screen flex items-center justify-center left-0 top-0">
          <div className="bg-white flex flex-col gap-2 rounded-lg w-full md:w-1/2 lg:w-1/3 p-4">
            <button onClick={()=>setOpenDelIt(false)} className="flex justify-between">
              <p>Hapus Item {selected?.name} ?</p>
              <IoClose />
            </button>
            <hr />
            <div className="">
              Apakah anda yakin ingin menghapus Item <strong>{selected?.name}</strong>
            </div>
            <hr />
              <div className="flex gap-3 justify-end">
                <button 
                  type='button'
                  onClick={()=>setOpenDelIt(false)}
                  className='p-2 whitespace-nowrap rounded-lg text-sm '
                >
                  Batal
                </button>
                <button 
                  type='button'
                  onClick={handleDeleteItem}
                  className='p-2 bg-red-200 whitespace-nowrap border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-300'
                >
                  Hapus
                </button>
              </div>
          </div>
          </div>
        )
      }
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <button onClick={()=>router.back()}>
            <MdArrowBack/>
          </button>
          <h2>Item List {data?.category}</h2>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button 
            type='button'
            onClick={()=>setOpenAdd(true)} 
            className='p-2 bg-green-200 border border-green-600 text-green-600 rounded-lg hover:bg-green-300'
          >
            Tambah Item
          </button>
          <button 
            type='button'
            onClick={()=>setOpenEditCat(true)} 
            className='p-2 bg-blue-200 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-300'
          >
            Edit Category
          </button>
          <button 
            type='button'
            onClick={()=>setOpenDelCat(true)} 
            className='p-2 bg-red-200 border border-red-600 text-red-600 rounded-lg hover:bg-red-300'
          >
            Hapus Category
          </button>
        </div>
      </div>
      <div className="flex flex-wrap flex-col md:flex-row gap-2">
        {data?.items.map((_: any,i: any)=>{
          return (
            <div key={i} className="bg-slate-200 p-2 rounded-lg min-w-[20%] flex flex-col gap-2">
              <p>{_.name}</p>
              <div className="flex gap-2">
                <button 
                  type='button'
                  onClick={()=>{setOpenDelIt(true), setSelected(_)}} 
                  className='p-2 py-1 inline-flex gap-1 items-center text-xs bg-red-200 border border-red-600 text-red-600 rounded-lg hover:bg-red-300'
                >
                  <FaRegTrashAlt/> <span>Hapus</span>
                </button>
                <button 
                  type='button'
                  onClick={()=>{setOpenEditIt(true), setSelected(_)}} 
                  className='p-2 py-1 inline-flex gap-1 items-center text-xs bg-blue-200 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-300'
                >
                  <LuPencil/> <span>Edit</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DetailsCategories