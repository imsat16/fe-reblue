import Image from 'next/image'
import React from 'react'

const VisionViews = () => {
  return (
    <section id='vision' className='min-h-screen flex p-4 items-center container mx-auto'>
        <div className="flex gap-10 w-full md:flex-row flex-col">
            <div className="md:w-1/2 ">
                <div className="w-full h-[35vh] md:h-[350px] relative">
                    <Image alt='sdd' fill className="w-full h-full rounded-2xl object-cover" src="/thumb1.jpg" />
                </div>
            </div>
            <div className="flex md:w-1/2  flex-col p-4 gap-6 text-sky-500">
                <h1 className="text-3xl md:text-4xl font-semibold leading-10">Misi kami menyediakan platform untuk bumi yang lebih sehat!</h1>
                <div className="font-medium text-sm leading-none">
                    Membangun sebuah platform yang diharapkan dapat menggerakkan masyarakat untuk senantiasa sadar dan cinta terhadap kebersihan lingkungan dengan memanfaatkan sampah plastik sebagai bahan utama daur ulang yang dapat memiliki nilai jual serta guna yang baik.
                </div>
            </div>
        </div>
    </section>
  )
}

export default VisionViews