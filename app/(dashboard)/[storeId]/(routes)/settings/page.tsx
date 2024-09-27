import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}


const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    const userId = '2'

    if (!userId) {
        redirect("/auth/login")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if (!store) {
        redirect('/')
    }
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initalDate={store} />
            </div>

        </div>
    )
}

export default SettingsPage