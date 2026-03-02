'use client'

import { Conversation, ConversationContent } from "@/components/ai-elements/conversation"
import { Spinner } from "@/components/ui/spinner"
import { useAIModels } from "@/modules/agent/hook/agent"
import useGetChatById from "@/modules/chat/hooks/useGetChatById"
import { useChatStore } from "@/modules/chat/store/chat"
import { useState } from "react"

const MsgWithForm = ({ id }: { id: string }) => {
    const { data: models, isPending: isModelsLoading } = useAIModels()
    const { data, isPending } = useGetChatById(id)
    const { hasChatBeenTriggered, markChatAsTriggered } = useChatStore()
    const [model, setModel] = useState(data?.data?.model)
    const [input, setInput] = useState('')
    if (isPending) return (
        <div className="flex items-center justify-center h-full">
            <Spinner />
        </div>
    )
    return (
        <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
<div className="flex flex-col h-full">
    <Conversation className="h-full">
<ConversationContent>
    {}
</ConversationContent>
    </Conversation>
</div>
        </div>
    )
}

export default MsgWithForm