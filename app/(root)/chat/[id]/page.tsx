import ActiveChatLoader from "@/modules/msg/components/ActiveChatLoader"
import MsgWithForm from "@/modules/msg/components/MsgWithForm"

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    return (
        <>
            <ActiveChatLoader id={id} />
            <MsgWithForm id={id} />
        </>
    )
}

export default Page