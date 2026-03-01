import { useQuery } from "@tanstack/react-query"
import { getChatById } from "../actions"

const useGetChatById = (id: string) => useQuery({
    queryKey: ['chats', id],
    queryFn: () => getChatById(id)
})

export default useGetChatById