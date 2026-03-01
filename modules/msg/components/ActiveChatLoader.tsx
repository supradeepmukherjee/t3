'use client'

import useGetChatById from "@/modules/chat/hooks/useGetChatById"
import { useChatStore } from "@/modules/chat/store/chat"
import { useEffect } from "react"

const ActiveChatLoader = ({ id }: { id: string }) => {
    const { addChat, chats, setActiveId, setMsgs } = useChatStore()
    const { data } = useGetChatById(id)
    useEffect(() => {
        if (!id) return
    }, [id, setActiveId])
    useEffect(() => {
        if (!data?.data || !data?.success) return
        setMsgs(data?.data.msgs)
        if (!chats?.some(c => c.id === data?.data?.id)) addChat(data?.data)
    }, [addChat, chats, data?.data, data?.success, setMsgs])
}

export default ActiveChatLoader