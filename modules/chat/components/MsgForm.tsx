import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useAIModels } from "@/modules/agent/hook/agent"
import { Send } from "lucide-react"
import { KeyboardEvent, SyntheticEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import useCreateChat from "../hooks/useCreateChat"
import ModelSelector from "./ModelSelector"

const MsgForm = ({ initialMsg, onMsgChange }: {
    initialMsg: string,
    onMsgChange?: () => void
}) => {
    const [msg, setMsg] = useState('')
    const { data, isPending } = useAIModels()
    const { mutateAsync, isPending: isNewChatPending } = useCreateChat()
    const [model, setModel] = useState(data?.models?.[0].id)
    const handleSubmit = async (e: KeyboardEvent<HTMLTextAreaElement> | SyntheticEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await mutateAsync({ msg, model })
            console.log('msg submitted')
        } catch (err) {
            console.error(err)
            toast.error('Failed to send message')
        } finally {
            setMsg('')
        }
    }
    useEffect(() => {
        if (initialMsg) {
            setMsg(initialMsg)
            onMsgChange?.()
        }
    }, [initialMsg, onMsgChange])
    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-6">
            <form onSubmit={handleSubmit}>
                <div className="relative rounded-2xl border-border shadow-sm transition-all">
                    <Textarea
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        placeholder="Type your message here..." className="min-h-15 max-h-50 resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit(e)
                            }
                        }}
                    />
                    <div className="flex items-center justify-between gap-2 px-3 py-2 border-t">
                        <div className="flex items-center gap-1">
                            {isPending ?
                                <><Spinner /></>
                                :
                                <>
                                    <ModelSelector models={data?.data} id={model} onModelSelect={setModel} className="ml-1" />
                                </>
                            }
                        </div>
                        <Button type="submit" disabled={!msg.trim() || isNewChatPending} size='sm' variant={msg.trim() ? 'default' : 'ghost'}>
                            {isNewChatPending ?
                                <><Spinner /></>
                                :
                                <>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">
                                        Send Message
                                    </span>
                                </>}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MsgForm