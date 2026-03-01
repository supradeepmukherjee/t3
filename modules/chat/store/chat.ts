import { create } from "zustand";

export const useChatStore = create<{
    activeId: string | null
    setActiveId: (id: string) => void
}>((set, get) => ({
    activeId: null,
    setActiveId: (id: string) => set({ activeId: id })
}))