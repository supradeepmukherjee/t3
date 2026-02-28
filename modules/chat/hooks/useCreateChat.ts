import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createChatWithMsg } from "../actions"
import { toast } from "sonner"
import { MsgRole, MsgType } from "@/lib/generated/prisma/enums"

const useCreateChat = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation<
    {
      success: boolean;
      msg: string;
      data: null;
    } | {
      success: boolean;
      msg: string;
      data: {
        msgs: {
          model: string | null;
          id: string;
          createdAt: Date;
          updatedAt: Date;
          msgRole: MsgRole;
          msgType: MsgType;
          content: string;
          chatId: string;
        }[];
      } & {
        model: string;
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
      };
    },
    Error,
    { msg: string; model: string }
  >({
    mutationFn: v => createChatWithMsg(v as unknown as { msg: string; model: string; }),
    onSuccess: (res) => {
      if (res.success && res.data) {
        queryClient.invalidateQueries({ queryKey: ['chats'], })
        router.push(`/chat/${res.data.id}?autoTrigger=true`)
      }
    },
    onError: (err) => {
      console.error('Create chat error: ', err);
      toast.error('Failed to create new chat')
    }
  })
}

export default useCreateChat