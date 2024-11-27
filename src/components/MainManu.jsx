import { NavLink } from "react-router"

export default function MainMenu() {

    return (
        <>
            <nav className="d-flex m-2">
                <NavLink to="/"><h5>Home</h5></NavLink>
                <NavLink to="/posts"><h5>Posts</h5></NavLink>
                <NavLink to="/about"><h5>About</h5></NavLink>
            </nav>
        </>
    )
}