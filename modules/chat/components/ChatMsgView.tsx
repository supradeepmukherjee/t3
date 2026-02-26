'use client'
import UserBtn from "@/modules/auth/components/UserBtn"
import { useState } from "react";
import ChatWelcomeTabs from "./ChatWelcomeTabs";
import MsgForm from "./MsgForm";

const ChatMsgView = ({ user }: {
    user: {
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string | null;
        emailVerified: boolean;
    } | null
}) => {
    const [msg, setMsg] = useState('')
    const handleSelectMsg = (msg: string) => {
        setMsg(msg)
    }
    const handleMsgChange = () => {
        setMsg('')
    }
    return (
        <div className="flex flex-col h-screen items-center justify-center space-y-10">
            <ChatWelcomeTabs name={user?.name} onSelectMsg={handleSelectMsg} />
            <MsgForm initialMsg={msg} onMsgChange={handleMsgChange} />
        </div>
    )
}

export default ChatMsgView