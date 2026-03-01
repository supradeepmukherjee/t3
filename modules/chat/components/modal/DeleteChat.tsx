'use client'

import { toast } from "sonner"
import useDeleteChat from "../../hooks/useDeleteChat"
import Modal from "@/components/ui/modal"

const DeleteChat = ({ id, modalOpen, setModalOpen }: {
    modalOpen: boolean,
    setModalOpen: (_: boolean) => void,
    id: string
}) => {
    const { mutateAsync, isPending } = useDeleteChat(id)
    const handleDelete = async () => {
        try {
            await mutateAsync()
            toast.success('Chat deleted successfully')
            setModalOpen(false)
        } catch (err) {
            console.error(err)
            toast.error('Failed to delete chat')
        }
    }
    return (
        <Modal
            title="Delete Chat"
            description="Are you sure you want to delete this chat? This can\'t be undone"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleDelete}
            submitText={isPending ? 'Deleting...' : 'Delete'}>
            <p className="text-sm text-zinc-500">
                Once deleted, all requests & data in this chat will be permanently removed
            </p>
        </Modal>
    )
}

export default DeleteChat