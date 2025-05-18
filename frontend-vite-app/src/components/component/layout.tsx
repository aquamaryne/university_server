import MainPage from "./mainPage"
import { useLocation } from "react-router-dom";

const Layout = ({ children } : { children: React.ReactNode }) => {
    const location = useLocation();

    return(
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            {location.pathname !== '/' && (
                <header>
                    <MainPage />
                </header>
            )}
            <main style={{ flex: 1, paddingTop: location.pathname !== '/' ? '20px' : '0px'}}>
                {children}
            </main>
        </div>
    );
};

export default Layout;