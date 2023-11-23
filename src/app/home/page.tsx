'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import dumdat from "./dummy.json"
import dumloc from "./location.json"
import { BsArrowLeftShort } from "react-icons/bs"
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { BiImageAdd } from "react-icons/bi"
import Image from 'next/image';
import { getMyLocation } from '@/api/location'
import { getItemList } from '@/api/item'
import Botnav from '@/components/Botnav'
import { reqJemput } from '@/api/request'
import Link from 'next/link'
interface Item {
  category_id: string;
  item_id: string;
  weight: number
}

const HomePages = () => {
  const router = useRouter();
  const cookies = parseCookies()
  const token = cookies.token;

  const [open, setOpen] = React.useState(false)
  const [openPreview, setOpenPreview] = React.useState(false)
  const [success, setSuccess] = React.useState(false)


  const [locList, setLocList] = React.useState([])
  const [itemList, setItemList] = React.useState([])
  const [totalWeight, setTotalWeight] = React.useState(0);

  const [data, setData]: any = React.useState([])
  const [weightData, setWeightData] = React.useState<{ [key: string]: number | null }>({});

  const [selectedImage, setSelectedImage] = React.useState(null)
  const [previewImage, setPreviewImage] = React.useState("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    console.log(file)
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const [selected, setSelected]: any = React.useState();
  const [selectedLoc, setSelectedLoc]: any = React.useState();
  const [activedCategory, setActivedCategory]: any = React.useState();
  const categoryMap: any = {};
  const [hide, setHide] = React.useState<boolean>(true);
  const [selectedCounts, setSelectedCounts] = React.useState<{ [category_id: string]: number }>({});

  React.useEffect(() => {
    if (!token) {
      router.push("/login")
      return;
    }
  }, [router, token])

  React.useEffect(() => {
    // Hitung total weight menggunakan reduce
    const calculatedTotalWeight = data?.reduce((acc: any, currentItem: any) => acc + currentItem.weight, 0);

    // Simpan total weight dalam state
    setTotalWeight(calculatedTotalWeight);
  }, [data]);

  //token
  React.useEffect(() => {
    if (token) {
      router.push("/home")
      return;
    } else {
      return;
    }
  }, [token, router])

  React.useEffect(() => {
    MyLocation()

    getItemList().then((res: any) => {
      setItemList(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error
    })

  }, [])

  // Inisialisasi selectedCounts
  React.useEffect(() => {
    const counts: { [category_id: string]: number } = {};
    itemList?.forEach((category: any) => {
      counts[category.category_id] = 0;
    });
    setSelectedCounts(counts);
  }, []);

  async function MyLocation() {
    getMyLocation().then((res: any) => {
      setLocList(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error
    })
  }

  data?.forEach((item: any) => {
    categoryMap[item.item_id] = item.category_id;
  });

  function handleClickCategory(params: any) {
    setHide(false);
    const updatedSelected = params.items.map((item: any) => {
      const existingItem = selected?.find((selectedItem: any) => selectedItem.item_id === item.item_id);
      if (existingItem) {
        return {
          ...item,
          // isSelected: existingItem.isSelected, 
          weight: existingItem.weight,
        };
      }
      return {
        ...item,
        // isSelected: false, 
        weight: null
      };
    });
    setActivedCategory(params);
    console.log({ params })
    setSelected(updatedSelected);
  }

  function handleWeightChange(item_id: string, newWeight: number) {
    setWeightData((prevData) => ({
      ...prevData,
      [item_id]: newWeight,
    }));

    const updatedSelected = selected.map((item: any) =>
      item.item_id === item_id
        ? { ...item, weight: newWeight }
        : item
    );
    setSelected(updatedSelected);
  }

  function handleClickSave(params: any) {
    // Mencegah duplikasi item_id
    if (data?.some((item: any) => item.item_id === params.item_id)) {
      return;
    }

    // Menghitung jumlah jenis yang dipilih untuk setiap category_id
    const counts: { [category_id: string]: number } = { ...selectedCounts };
    const selectedCategory: any = itemList?.find((category: any) =>
      category.items.some((item: any) => item.item_id === params.item_id)
    );

    if (selectedCategory) {
      counts[selectedCategory.category_id] = (counts[selectedCategory.category_id] || 0) + 1;
    }

    setHide(true);

    // Copy the existing data and add the new item
    setData((prevData: any) => {
      const newItem: Item = {
        category_id: selectedCategory?.category_id,
        item_id: params.item_id,
        weight: params.weight, // Set the weight value as needed
        // isSelected: true, // Menandai item yang dipilih
      };

      // Add the new item to the data
      return [...prevData, newItem];
    });

    // setSelected(updatedSelected);
    setSelectedCounts(counts);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    reqJemput({
      location_id: selectedLoc?._id,
      items: data,
      image: selectedImage
    }).then((res) => {
        setSuccess(true)
        setSelectedLoc("")
        setData(undefined)
        setSelectedImage(null)
        setSelected(undefined)
        setSelectedCounts({})
        setPreviewImage("")
        setTimeout(() => {
          setSuccess(false)
        }, 5000);
        console.log(res)
    })

    const xyz = {
      images: selectedImage,
      items: data,
      location_id: selectedLoc?._id
    }
    console.log(xyz);
  }

  return (
    <main className='flex gap-4 relative'>
      {open &&
        <div
          // onClick={()=>setOpen(false)} 
          className="bg-black/40 fixed z-10 w-full min-h-screen flex items-center justify-center"
        >
          <div
            className="flex flex-col gap-4 bg-white w-[50vw] p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <h3 className='text-xl font-semibold'>Pilih lokasi tujuan</h3>
              <button type="button" onClick={() => { MyLocation(), setOpen(true) }}>Refresh</button>
              <button type='button' onClick={() => setOpen(false)}>x</button>
            </div>
            {locList?.map((_: any, i: number) => {
              return (
                <div key={i} className='flex flex-col'>
                  <div onClick={() => { setSelectedLoc(_), setOpen(false) }} className="cursor-pointer border bg-white p-2 rounded-lg hover:bg-blue-300/50">
                    <p className='text-sm font-semibold'>{_.address}</p>
                    <p className='text-xs'>{_.note}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }

      {
        openPreview &&
        <div
          onClick={() => setOpenPreview(false)}
          className="bg-black/60 fixed z-10 w-full min-h-screen flex items-center justify-center"
        >
          <div
            onClick={() => setOpenPreview(false)}
            className="absolute top-10 right-10 cursor-pointer text-white"
          >
            close
          </div>
          <div className="max-h-[90vh] max-w-[90vw] w-full h-full p-64 relative">
            <Image
              onClick={() => setOpenPreview(false)}
              fill
              className='object-contain w-full h-full rounded-lg'
              src={previewImage}
              alt="Gambar"
            />
          </div>
        </div>
      }

      <Sidebar />

      {success
        ?
        <div
          className='w-full flex flex-col lg:flex-row gap-5 p-11 px-8'
        >
          <div className="flex flex-col justify-center uppercase items-center gap-4 bg-white flex-1 md:min-h-[500px] h-[50vh] rounded-lg overflow-y-scroll">
            <h3 className='text-3xl font-semibold'>request berhasil terkirim</h3>
            <h4 className='text-2xl'>tunggu aku menjemput ya</h4>
            <Link href="/history" className='text-sm text-blue-400'>cek request</Link>
          </div>
        </div>
        :
        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col lg:flex-row gap-5 p-11 px-8'
        >
          <div className="flex flex-col gap-4 bg-white flex-1 md:min-h-[500px] h-[50vh] rounded-lg overflow-y-scroll">
            <div className="sticky top-0 bg-white p-4">
              <h2 className='text-2xl font-semibold'>Reput Services</h2>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem voluptatum ex laborum ratione cumque repellendus voluptates est odit eius?</p>
              {/* <div>{JSON.stringify(data)}{data.length}</div> */}
            </div>
            {
              hide ?
                <div className="flex flex-col gap-4 p-4 pt-0">
                  {
                    itemList.length < 1 ? 'loading' : itemList?.map((_: any, i: number) => {
                      return (
                        <div key={i} onClick={() => console.log(itemList)} className="border rounded-lg p-2 px-4 flex justify-between items-center w-full">
                          <div className="flex items-center">
                            <div className="h-20 w-20 border flex items-center justify-center">
                              {_.category}
                            </div>
                            <h3>{_.category} ({selectedCounts[_.category_id] || 0} dipilih)</h3>
                          </div>
                          <button
                            className='bg-blue-400 px-2 p-1 rounded-lg'
                            type='button'
                            onClick={() => handleClickCategory(_)}
                          >
                            Select
                          </button>
                        </div>
                      )
                    })
                  }
                </div>
                :
                <div className="flex flex-col items-start gap-4 p-4 pt-0">
                  <button className='flex items-center gap-.5' onClick={() => setHide(true)}> <span className='text-2xl'><BsArrowLeftShort /></span> Back</button>
                  {/* {mergedData.map((x,y) => (
                  <p key={y} onClick={()=>console.log(mergedData)} className={x.item_id ? 'text-red-500' : ''}>{x.title}</p>
                ))} */}
                  {
                    selected?.map((_: any, i: any) => {
                      const category = categoryMap[_.item_id];
                      const itemSelected = categoryMap[_.item_id] === categoryMap[_.category_id];
                      const weight = weightData[_.item_id] ?? null;
                      return (
                        <div key={i} className=" w-full">
                          <div onClick={() => console.log(JSON.stringify(selected))} className="flex justify-between items-center">

                            {/* <p onClick={()=>console.log(data)} className={_.item_id === activedCategory.jenis[i].item_id ? 'text-red-500' : ''}>{_.title}</p> */}
                            <p onClick={() => console.log({ weight })} className={itemSelected ? '' : 'text-blue-500'}>{_.name}</p>
                            <div className="flex gap-2 ">
                              <div className="border rounded-lg p-1">
                                <input
                                  type="number"
                                  id={`weight-${_.item_id}`}
                                  className='inline-block w-8 '
                                  value={weight ?? ''}
                                  onChange={(e) => handleWeightChange(_.item_id, parseFloat(e.target.value))}
                                />
                                <label htmlFor={`weight-${_.item_id}`}>Kg</label>
                              </div>
                              <button
                                type='button'
                                className='bg-blue-300 px-2 rounded-lg'
                                onClick={() => { handleClickSave(_), setHide(true) }}
                              // disabled={_.isSelected}
                              >
                                simpan
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
            }
          </div>

          <div className="bg-white flex-1 flex flex-col rounded-lg md:min-h-[500px] h-[50vh]">
            {/* {JSON.stringify(data)} */}
            <div className="p-9  w-full flex flex-col gap-4">
              <div className="group w-full  hover:bg-black/30 rounded-xl relative flex justify-center items-center aspect-video bg-[#F2F2F2]">
                {/* <p className='flex flex-col items-center text-5xl'>
                <BiImageAdd/>
                <span className="text-base">tambah gambar</span>
              </p> */}
                {previewImage
                  ?
                  <Image
                    onClick={() => setOpenPreview(true)}
                    fill
                    className='object-cover rounded-md'
                    src={previewImage}
                    alt="Gambar"
                  />
                  : <div
                    className='flex h-full relative w-full items-center justify-center bg-gray-300 rounded-md '
                  >
                    <input type="file" className='w-full h-full bg-red-400 opacity-0 absolute' onChange={handleImageUpload} />
                    <p className={`${previewImage ? 'hidden group-hover:flex z-10' : 'flex'} flex-col items-center text-5xl`}>
                      <BiImageAdd />
                      <span className="text-base">{previewImage ? 'edit gambar' : 'tambah gambar'}</span>
                    </p>
                  </div>
                }

                {/* <div 
                    className='group-hover:flex hidden items-center justify-center bg-gray-300 rounded-md '
                  >
                  <input type="file" className='w-full h-full bg-red-400 opacity-0 absolute' onChange={handleImageUpload} />
                  <p className='flex flex-col items-center text-5xl'>
                    <BiImageAdd/>
                    <span className="text-base">edit gambar</span>
                  </p>
              </div> */}
                {/* <Image
                src={'https://images.unsplash.com/photo-1682687982134-2ac563b2228b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt=''
                fill
                className='object-cover rounded-xl opacity-80'
              /> */}
              </div>
              {previewImage && <button onClick={() => setPreviewImage("")} type='button'>hapus gambar</button>}
              <div onClick={() => setOpen(!open)} className="cursor-pointer text-sm p-2 border rounded-lg border-black">
                {selectedLoc ? selectedLoc?.address : "Pilih lokasi tujuan"}
              </div>
              <button disabled={data?.length < 1 || selectedLoc?._id === undefined || previewImage === ""} className='bg-blue-400 rounded-lg p-4 disabled:bg-gray-300' type='submit'>Total Sampah | {totalWeight} Kg | {totalWeight * 100}</button>
            </div>
          </div>
        </form>

      }
      <Botnav />
    </main>
  )
}

export default HomePages