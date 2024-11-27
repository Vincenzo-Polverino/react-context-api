import { Outlet } from "react-router"
import AppHeader from "../components/AppHeader"

export default function Layout() {

    return (
        <>
            <header className="shadow-sm p-2 mb-5">
                <AppHeader />
            </header>

            <div className="container">
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}