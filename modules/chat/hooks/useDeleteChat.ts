import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteChat } from "../actions"

const useDeleteChat = (id:string) => {
  const queryClient = useQueryClient()
  return useMutation<
    {
      success: boolean;
      msg: string;
      data: null;
    },
    Error
  >({
    mutationFn: () => deleteChat(id),
    onSuccess: (res) => {
      if (res.success) queryClient.invalidateQueries({ queryKey: ['chats'], })
    },
    onError: (err) => {
      console.error('Delete chat error: ', err);
      toast.error('Failed to delete chat')
    }
  })
}

export default useDeleteChat