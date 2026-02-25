import { currentUser } from "@/modules/auth/actions";
import UserBtn from "@/modules/auth/components/UserBtn";

export default async function Home() {
  const { data } = await currentUser()
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <UserBtn
        user={data} 
        />
    </div>
  );
}
