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

export const getAllChats = async () => {
    try {
        const { data } = await currentUser()
        if (!data) return {
            success: false,
            msg: 'Unauthenticated',
            data: null
        }
        const chats = await prisma.chat.findMany({
            where: { userId: data.id },
            include: { msgs: true },
            orderBy: { createdAt: 'desc' }
        })
        return {
            success: true,
            msg: 'Chats fetched successfully',
            data: chats
        }
    } catch (err) {
        console.error('Error fetching chats', err)
        return {
            success: false,
            msg: 'Failed to fetch chats',
            data: null
        }
    }
}

export const deleteChat = async (id: string) => {
    try {
        const { data } = await currentUser()
        if (!data) return {
            success: false,
            msg: 'Unauthenticated',
            data: null
        }
        const chat = await prisma.chat.findUnique({ where: { id, userId: data.id } })
        if (!chat) return {
            success: false,
            msg: 'Chat not found',
            data: null
        }
        await prisma.chat.delete({ where: { id } })
        revalidatePath('/')
        return {
            success: true,
            msg: 'Chat deleted successfully',
            data: null
        }
    } catch (err) {
        console.error('Failed to delete chat', err)
        return {
            success: false,
            msg: 'Failed to delete chat',
            data: null
        }
    }
}