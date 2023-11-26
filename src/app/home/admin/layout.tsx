"use client"
import { roles } from "@/api/api"
import { useRouter } from "next/navigation";
import React from "react"
import Botnav from "@/components/Botnav"
import Sidebar from "@/components/Sidebar"

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter();

    React .useEffect(() => {
      roles === 'picker' && router.replace('/home/picker')
      roles === 'user' && router.replace('/home')
      roles !== 'admin' && router.back()
    }, [])
    return (
        <main className='flex gap-4 relative '>
            <section className="w-full p-11 px-8">
                {children}
            </section>
        </main>
    )
  }