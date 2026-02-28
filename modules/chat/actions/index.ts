'use server'

import { prisma } from "@/lib/db"
import { MsgRole, MsgType } from "@/lib/generated/prisma/enums"
import { currentUser } from "@/modules/auth/actions"
import { revalidatePath } from "next/cache"

export const createChatWithMsg = async ({ msg, model }: {
    msg: string
    model: string
}) => {
    try {
        const { data: user } = await currentUser()
        if (!user) return {
            success: false,
            msg: 'Unauthorized user',
            data: null
        }
        if (!msg.trim()) return {
            success: false,
            msg: 'Message is required',
            data: null
        }
        const title = msg.slice(0, 50) + (msg.length > 50 ? '...' : '')
        const chat = await prisma.chat.create({
            data: {
                title,
                model,
                userId: user.id,
                msgs: {
                    create: {
                        content: msg,
                        msgRole: MsgRole.USER,
                        msgType: MsgType.NORMAL,
                        model
                    }
                }
            },
            include: { msgs: true }
        })
        revalidatePath('/')
        return {
            success: true,
            msg: 'Chat created successfully',
            data: chat
        }
    } catch (err) {
        console.error('Error creating chat', err)
        return {
            success: false,
            msg: 'Failed to create chat',
            data: null
        }
    }
}