'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"

export const currentUser = async () => {
    try {
        const session = await auth.api.getSession({ headers: await headers() })
        if (!session?.user.id) return {
            success: false,
            msg: 'Unauthenticated',
            data: null
        }
        const user = await prisma.user.findUnique({ where: { id: session.user.id }, })
        return {
            success: true,
            msg: 'Fetched current User',
            data: user
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            msg: 'Something went wrong',
            data: null
        }
    }
}