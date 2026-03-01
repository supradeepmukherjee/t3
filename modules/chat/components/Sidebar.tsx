'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MsgRole, MsgType } from "@/lib/generated/prisma/enums"
import UserBtn from "@/modules/auth/components/UserBtn"
import { EllipsisIcon, PlusIcon, SearchIcon, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, Fragment, MouseEvent as ReactMouseEvent, useMemo, useState } from "react"
import { useChatStore } from "../store/chat"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteChat from "./modal/DeleteChat"

const Sidebar = ({ user, chats }: {
  user: {
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    image: string | null;
    emailVerified: boolean;
  } | null
  chats: ({
    msgs: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      model: string | null;
      msgRole: MsgRole;
      msgType: MsgType;
      content: string;
      chatId: string;
    }[];
  } & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    title: string;
    model: string;
  })[] | null
}) => {
  const [query, setQuery] = useState('')
  const [id, setId] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const { activeId } = useChatStore()
  const filteredChats = useMemo(() => {
    if (!query.trim()) return chats
    const _query = query.toLowerCase()
    return chats?.filter(c => c.title.toLowerCase().includes(_query) || c.msgs.some(m => m.content.toLowerCase().includes(_query)))
  }, [chats, query])
  const groupedChats = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    yesterday.setDate(lastWeek.getDate() - 7)
    const grps = {
      today: [],
      yesterday: [],
      lastWeek: [],
      older: [],
    }
    filteredChats?.forEach(c => {
      const chatDate = new Date(c.createdAt)
      if (chatDate >= today) grps.today.push(c as never)
      else if (chatDate >= yesterday) grps.yesterday.push(c as never)
      else if (chatDate >= lastWeek) grps.lastWeek.push(c as never)
    })
    return grps
  }, [filteredChats])
  const onDelete = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setId(id)
    setModalOpen(false)
  }
  const renderChatList = (l: {
    id: string,
    title: string
  }[]) => {
    if (l.length === 0) return null
    return l.map(c => (
      <Fragment key={c.id}>
        <Link
          href={`/chat/${c.id}`}
          className={cn('block rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors', c.id === activeId && 'bg-sidebar-accent')}>
          <div className="flex flex-row justify-between items-center gap-2">
            <span className="truncate flex-1">
              {c.title}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className="h-6 w-6 group-hover:opacity-100 hover:bg-sidebar-accent-foreground/10" onClick={e => e.preventDefault()}>
                  <EllipsisIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-row gap-2 cursor-pointer" onClick={e => onDelete(e, c.id)}>
                  <Trash className='h-4 w-4 text-red-500' />
                  <span className="text-red-500">
                    Delete
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Link>
        <DeleteChat id={c.id} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Fragment>
    ))
  }
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src={'/logo.svg'} alt="Logo" width={100} height={100} />
        </div>
      </div>
      <div className="p-4">
        <Link href={'/'}>
          <Button className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </Link>
      </div>
      <div className="px-4 pb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-foreground" />
          <Input placeholder="Search your chat..." className="pl-9 bg-sidebar-accent border-sidebar-b pr-8" value={query} onChange={handleQueryChange} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {filteredChats?.length === 0 ?
          <div className="text-center text-sm text-muted-foreground py-8">
            No Chats Yet
          </div>
          :
          <>
            {groupedChats.today.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                  Today
                </div>
                {renderChatList(groupedChats.today)}
              </div>
            )}
            {groupedChats.yesterday.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                  Yesterday
                </div>
                {renderChatList(groupedChats.yesterday)}
              </div>
            )}
            {groupedChats.lastWeek.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                  Last Week
                </div>
                {renderChatList(groupedChats.lastWeek)}
              </div>
            )}
            {groupedChats.older.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                  Older
                </div>
                {renderChatList(groupedChats.older)}
              </div>
            )}
          </>
        }
      </div>
      <div className="p-4 flex items-center gap-3 border-t border-sidebar-border">
        <UserBtn user={user} />
        <span className="flex-1 text-sm text-sidebar-foreground truncate">
          {user?.email}
        </span>
      </div>
    </div>
  )
}

export default Sidebar