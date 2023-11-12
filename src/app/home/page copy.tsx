'use client'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import dumdat from "./dummy.json"
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

interface Item {
  category_id?: string;
  item_id: string;
  weight: number;
  isSelected: boolean;
}

const HomePages = () => {
  const router = useRouter();

  const [data, setData] = React.useState<Item[]>([])
  const [selected, setSelected]:any = React.useState();
  const [activedCategory, setActivedCategory]:any = React.useState();
  const [hide, setHide] = React.useState<boolean>(true);
  const [selectedCounts, setSelectedCounts] = React.useState<{ [category_id: string]: number }>({});

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

  // Inisialisasi selectedCounts
  React.useEffect(() => {
    const counts: { [category_id: string]: number } = {};
    dumdat.forEach((category) => {
      counts[category.category_id] = 0;
    });
    setSelectedCounts(counts);
  }, []);

  function handleClickCategory(params: any) {
    setHide(false);
    const updatedSelected = params.jenis.map((item: any) => {
      const existingItem = selected?.find((selectedItem: any) => selectedItem.item_id === item.item_id);
      if (existingItem) {
        return { ...item, isSelected: existingItem.isSelected, weight: existingItem.weight, };
      }
      return { ...item, isSelected: false, weight: null };
    });
    setActivedCategory(params);
    console.log({params})
    setSelected(updatedSelected);
  }

  function handleWeightChange(item_id: string, newWeight: number) {
    const updatedSelected = selected.map((item: any) =>
      item.item_id === item_id
        ? { ...item, weight: newWeight }
        : item
    );
    setSelected(updatedSelected);
  }

  // function handleClickSave(params:any) {
  //   setHide(true)
  //   setData(params)
  // }

  // function handleClickSave(params: any) {
  //   setHide(true);

  //   // Copy the existing data and add the new item
  //   setData((prevData): Item[] => {
  //     // Find the category based on the selected item
  //     const selectedCategory:any = dumdat.find((category) =>
  //       category.jenis.some((item:any) => item.item_id === params.item_id)
  //     );

  //     // Create the new item to be added to the data
  //     const newItem: Item = {
  //       category_id: selectedCategory?.category_id,
  //       item_id: params.item_id,
  //       weight: 0, // Set the weight value as needed
  //     };

  //     // Add the new item to the data
  //     return [...prevData, newItem];
  //   });
  // }

  // function handleClickSave(params: any) {
  //   // Mencegah duplikasi item_id
  //   if (data.some((item) => item.item_id === params.item_id)) {
  //     return;
  //   }

  //   // Mengubah isSelected pada item yang dipilih
  //   const updatedSelected = selected.map((item: any) =>
  //     item.item_id === params.item_id
  //       ? { ...item, isSelected: true }
  //       : item
  //   );

  //   setHide(true);

  //   // Copy the existing data and add the new item
  //   setData((prevData) => {
  //     // Find the category based on the selected item
  //     const selectedCategory:any = dumdat.find((category) =>
  //       category.jenis.some((item) => item.item_id === params.item_id)
  //     );

  //     // Create the new item to be added to the data
  //     const newItem: Item = {
  //       category_id: selectedCategory.category_id,
  //       item_id: params.item_id,
  //       weight: 0, // Set the weight value as needed
  //       isSelected: true, // Menandai item yang dipilih
  //     };

  //     // Add the new item to the data
  //     return [...prevData, newItem];
  //   });

  //   setSelected(updatedSelected);
  // }

  function handleClickSave(params: any) {
    // Mencegah duplikasi item_id
    if (data.some((item) => item.item_id === params.item_id)) {
      return;
    }

    // Mengubah isSelected pada item yang dipilih
    const updatedSelected = selected.map((item: any) =>
      item.item_id === params.item_id
        ? { ...item, isSelected: true }
        : item
    );

    // Menghitung jumlah jenis yang dipilih untuk setiap category_id
    const counts: { [category_id: string]: number } = { ...selectedCounts };
    const selectedCategory = dumdat.find((category) =>
      category.jenis.some((item) => item.item_id === params.item_id)
    );
    if (selectedCategory) {
      counts[selectedCategory.category_id] = (counts[selectedCategory.category_id] || 0) + 1;
    }

    setHide(true);

    // Copy the existing data and add the new item
    setData((prevData) => {
      const newItem: Item = {
        category_id: selectedCategory?.category_id,
        item_id: params.item_id,
        weight: params.weight, // Set the weight value as needed
        isSelected: true, // Menandai item yang dipilih
      };

      // Add the new item to the data
      return [...prevData, newItem];
    });

    setSelected(updatedSelected);
    setSelectedCounts(counts);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(data);
  }

  const mergedData = data.map(item1 => {
    const correspondingItem2 = selected.find((item2:any) => item1.item_id === item2.item_id);
    return { ...item1, ...correspondingItem2 };
  });

  return (
    <main className='flex gap-4 '>
      <Sidebar/>
        <form 
          onSubmit={handleSubmit}
          className='w-full flex gap-5 p-11 px-8'
        >
        <div 
          className="bg-white flex-1 min-h-[500px] h-[50vh] rounded-lg p-4 overflow-y-scroll">
          <div className="sticky top-0 bg-white">
            <h2 className='text-2xl font-semibold'>Reput Services</h2>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem voluptatum ex laborum ratione cumque repellendus voluptates est odit eius?</p>
            <div>{JSON.stringify(data)}{data.length}</div>

          </div>
            {
              hide ? 
              <div className="flex flex-col gap-4 ">
                {
                  dumdat.map((_:any, i:number)=>{
                    return(
                      <div key={i} onClick={()=>console.log(dumdat)} className="border rounded-lg p-2 px-4 flex justify-between items-center w-full">
                        <div className="flex items-center">
                          <div className="h-20 w-20 border">
                            {_.category} 
                          </div>
                          <h3>{_.category} ({selectedCounts[_.category_id] || 0} dipilih)</h3>
                        </div>
                        <button 
                          className='bg-blue-400'
                          type='button'
                          onClick={()=>handleClickCategory(_)}
                        >
                          Select
                        </button>
                      </div>
                    )
                  })
                }
              </div>
              :
              <div className="flex flex-col gap-4">
                <button onClick={()=>setHide(true)}>Back</button>
                {/* {mergedData.map((x,y) => (
                  <p key={y} onClick={()=>console.log(mergedData)} className={x.item_id ? 'text-red-500' : ''}>{x.title}</p>
                ))} */}
                {
                  selected?.map((_:any, i:any)=>{
                    return(
                      <div key={i} className="">
                        <div onClick={()=>console.log(JSON.stringify(selected))} className="flex justify-between items-center">
                        
                          {/* <p onClick={()=>console.log(data)} className={_.item_id === activedCategory.jenis[i].item_id ? 'text-red-500' : ''}>{_.title}</p> */}
                          <p onClick={()=>console.log(data)} className={_.isSelected ? 'text-red-500' : ''}>{_.title}</p>
                          <div className="flex gap-2 ">
                            <div className="border rounded-lg p-1">
                              <input
                                type="number"
                                id={`weight-${_.item_id}`}
                                className='inline-block w-8 '
                                value={_.weight ?? ''}
                                onChange={(e) => handleWeightChange(_.item_id, parseFloat(e.target.value))}
                              />
                              <label htmlFor={`weight-${_.item_id}`}>Kg</label>
                            </div>
                            <button
                              type='button'
                              className='bg-blue-300 px-2 rounded-lg'
                              onClick={()=>handleClickSave(_)}
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

        <div className="bg-white flex-1 rounded-lg">
          {/* {JSON.stringify(data)} */}

          <button type='submit'>simpan</button>
        </div>
      </form>
    </main>
  )
}

export default HomePages