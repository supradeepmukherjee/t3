import { Textarea } from "@/components/ui/textarea"
import { KeyboardEvent, useEffect, useState } from "react"

const MsgForm = ({ initialMsg, onMsgChange }: {
    initialMsg: string,
    onMsgChange?: () => void
}) => {
    const [msg, setMsg] = useState('')
    const handleSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        try {
            e.preventDefault()
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        if (initialMsg) {
            setMsg(initialMsg)
            onMsgChange?.()
        }
    }, [initialMsg])
    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-6">
            <form onSubmit={() => { }}>
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
                        }} />
                </div>
            </form>
        </div>
    )
}

export default MsgForm