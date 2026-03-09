'use client'

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation"
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"
import { PromptInput, PromptInputBody, PromptInputButton, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input"
import { Spinner } from "@/components/ui/spinner"
import { useAIModels } from "@/modules/agent/hook/agent"
import ModelSelector from "@/modules/chat/components/ModelSelector"
import useGetChatById from "@/modules/chat/hooks/useGetChatById"
import { useChatStore } from "@/modules/chat/store/chat"
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from "ai"
import { RotateCcwIcon, StopCircleIcon } from "lucide-react"
import { Fragment, useMemo, useState } from "react"

const MsgWithForm = ({ id }: { id: string }) => {
    const { data: models, isPending: isModelsLoading } = useAIModels()
    const { data, isPending } = useGetChatById(id)
    const { hasChatBeenTriggered, markChatAsTriggered } = useChatStore()
    const [model, setModel] = useState(data?.data?.model)
    const [input, setInput] = useState('')
    const initialMsgs = useMemo(() => {
        if (!data?.data?.msgs) return []
        return data.data.msgs
            .filter(m => m.content?.trim() && m.id)
            .map(m => {
                try {
                    const parts = JSON.parse(m.content)
                    return {
                        id: m.id,
                        role: m.msgRole.toLowerCase(),
                        parts: Array.isArray(parts) ? parts : [{ type: 'text', text: m.content }],
                        createdAt: m.createdAt
                    }
                } catch (err) {
                    console.log(err)
                    return {
                        id: m.id,
                        role: m.msgRole.toLowerCase(),
                        parts: [{ type: 'text', text: m.content }],
                        createdAt: m.createdAt
                    }
                }
            })
    }, [data])
    const { messages, regenerate, sendMessage, status, stop, } = useChat({
        messages: [],
        transport: new DefaultChatTransport({ api: '/api/chat' })
    })
    const handleSubmit = () => {
        if (!input.trim()) return
        sendMessage(
            { text: input.trim() },
            {
                body: {
                    model,
                    chatId: id
                }
            }
        )
        setInput('')
    }
    const handleRetry = () => {
        regenerate()
    }
    const handleStop = () => {
        stop()
    }
    const msgToRender = [...initialMsgs, ...messages]
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
                        {msgToRender.length === 0 ?
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Start a conversation...
                            </div>
                            :
                            msgToRender.map(m => (
                                <Fragment key={m.id}>
                                    {m.parts.map(p => {
                                        switch (p.type) {
                                            case 'text':
                                                return (
                                                    <Message from={m.role as "user" | "system" | "assistant"} key={m.id}>
                                                        <MessageContent>
                                                            <MessageResponse>
                                                                {p.text}
                                                            </MessageResponse>
                                                        </MessageContent>
                                                    </Message>
                                                )

                                            default:
                                                break;
                                        }
                                    })}
                                </Fragment>
                            ))
                        }
                        {status === 'streaming' && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Spinner />
                                <div className="text-sm">
                                    ...
                                </div>
                            </div>
                        )}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
                <PromptInput onSubmit={handleSubmit} className="mt-4">
                    <PromptInputBody>
                        <PromptInputTextarea
                            className="mt-4"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type your message..." />
                    </PromptInputBody>
                    <PromptInputTools className="flex items-center">
                        {isModelsLoading ? <Spinner /> : <ModelSelector models={models.data} id={model as string} onModelSelect={setModel} />}
                        {status === 'streaming' ?
                            <PromptInputButton onClick={handleStop}>
                                <StopCircleIcon size={16} />
                                <span>
                                    Stop
                                </span>
                            </PromptInputButton>
                            : msgToRender.length > 0 && (
                                <PromptInputButton onClick={handleRetry}>
                                    <RotateCcwIcon onClick={handleRetry} />
                                    <span>
                                        Retry
                                    </span>
                                </PromptInputButton>
                            )}
                    </PromptInputTools>
                    <PromptInputSubmit status={status} />
                </PromptInput>
            </div>
        </div>
    )
}

export default MsgWithForm