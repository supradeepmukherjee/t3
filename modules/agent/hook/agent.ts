import { useQuery } from "@tanstack/react-query"

export const useAIModels = () => {
    return useQuery({
        queryKey: ['ai-models'],
        queryFn: () => fetch('/api/ai/models').then(async res => await res.json())
    })
}