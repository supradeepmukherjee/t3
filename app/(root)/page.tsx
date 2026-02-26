import ChatMsgView from "@/modules/chat/components/ChatMsgView";
import { currentUser } from "@/modules/auth/actions";

export default async function Home() {
  const { data } = await currentUser()
  return <ChatMsgView user={data} />
}