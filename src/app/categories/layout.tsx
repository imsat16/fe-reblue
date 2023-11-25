import Sidebar from "@/components/Sidebar"

export default function HistoryLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main className='flex gap-4 relative '>
            <Sidebar />
            <section className="w-full p-11 px-8">
                {children}
            </section>
        </main>
    )
  }