import { create } from "zustand";

export const useChatStore = create<ChatStore>((set, get) => ({
    chats: [],
    msgs: [],
    activeId: null,
    triggeredChats: new Set(),
    setActiveId: (id: string) => set({ activeId: id }),
    setChats: (chats: Chat[]) => set({ chats }),
    setMsgs: (msgs: Msg[]) => set({ msgs }),
    addChat: (chat: Chat) => set({ chats: [chat, ...get().chats] }),
    addMsg: (msg: Msg) => set({ msgs: [msg, ...get().msgs] }),
    clearMsgs: () => set({ msgs: [] }),
    markChatAsTriggered: (id: string) => {
        const triggered = new Set(get().triggeredChats)
        triggered.add(id)
        set({ triggeredChats: triggered })
    },
    hasChatBeenTriggered: (id: string) => get().triggeredChats.has(id)
}))

type Chat = {
    id: string
    // add other fields
}

type Msg = {
    id: string
    // add other fields
}

interface ChatStore {
    chats: Chat[]
    msgs: Msg[]
    activeId: string | null
    triggeredChats: Set<unknown>

    setActiveId: (id: string) => void
    setChats: (chats: Chat[]) => void
    setMsgs: (msgs: Msg[]) => void
    addChat: (chat: Chat) => void
    addMsg: (msg: Msg) => void
    clearMsgs: () => void
    markChatAsTriggered: (id: string) => void
    hasChatBeenTriggered: (id: string) => boolean
}