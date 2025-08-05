import { destroySession } from "@/lib/auth"
import { redirect } from "next/navigation";

const logout = async () => {
    await destroySession();
    redirect('/login')
}

export default logout
