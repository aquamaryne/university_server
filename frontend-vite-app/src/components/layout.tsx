import React from "react";
import { Outlet } from "react-router-dom";
import MainPage from "./mainPage";

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen">
            <div className="flex-shrink-0">
                <MainPage />
            </div>
            <div className="flex-1 p-4 overflow-auto bg-gray-300 min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;