import { auth } from "@/lib/auth"
import { currentUser } from "@/modules/auth/actions"
import { getAllChats } from "@/modules/chat/actions"
import Header from "@/modules/chat/components/Header"
import Sidebar from "@/modules/chat/components/Sidebar"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return redirect('/sign-in')
    const { data:user } = await currentUser()
    const { data:chats } = await getAllChats()
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar user={user} chats={chats} />
            <main className="flex-1 overflow-hidden">
                <Header />
                {children}
            </main>
        </div>
    )
}

export default Layout