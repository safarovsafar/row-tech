import { Outlet } from "react-router"
import Header from "../enteties/header/header"

const Layout = () => {

    

    return (
        <div className="dark:bg-black dark:text-white h-screen"> 
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
