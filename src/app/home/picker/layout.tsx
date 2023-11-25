"use client"
import { roles } from "@/api/api"
import { useRouter } from "next/navigation";
import React from "react"
export default function PickerLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter();

    React .useEffect(() => {
        roles === 'admin' && router.replace('/categories')
        roles === 'user' && router.replace('/home')
        roles !== 'picker' && router.back()
      }, [])

    return (
        <>
            {children}
        </>
    )
  }