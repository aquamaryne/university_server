import React from "react";
import { Outlet } from "react-router-dom";
import MainPage from "./mainPage";

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen">
            <MainPage />
            <div className="flex-1 p-4 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;