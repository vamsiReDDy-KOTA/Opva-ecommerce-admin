
import { UserButton } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "@/components/store-switcher"
import { auth } from "@/auth"
import prismadb from "@/lib/prismadb"

const Navbar = async () => {
    // const { userId } = auth()

    // if (!userId) {
    //     return("/auth/login")
    // }

    const userId = "2"
    if (!userId) {
        return ("/auth/login")
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b">

            <div className="flex h-16 items-center space-x-4 px-4">
                <StoreSwitcher items={stores} />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}

export default Navbar