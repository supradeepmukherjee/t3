import { create } from "zustand";

export const useChatStore = create<ChatStore>((set, get) => ({
    chats: [],
    msgs: [],
    activeId: null,
    setActiveId: (id: string) => set({ activeId: id }),
    setChats: (chats: Chat[]) => set({ chats }),
    setMsgs: (msgs: Msg[]) => set({ msgs }),
    addChat: (chat: Chat) => set({ chats: [chat, ...get().chats] }),
    addMsg: (msg: Msg) => set({ msgs: [msg, ...get().msgs] }),
    clearMsgs: () => set({ msgs: [] }),
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

    setActiveId: (id: string) => void
    setChats: (chats: Chat[]) => void
    setMsgs: (msgs: Msg[]) => void
    addChat: (chat: Chat) => void
    addMsg: (msg: Msg) => void
    clearMsgs: () => void
}