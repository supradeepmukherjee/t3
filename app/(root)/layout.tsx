import { auth } from "@/lib/auth"
import { currentUser } from "@/modules/auth/actions"
import Sidebar from "@/modules/chat/components/Sidebar"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return redirect('/sign-in')
    const { data } = await currentUser()
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar user={data} />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    )
}

export default Layout