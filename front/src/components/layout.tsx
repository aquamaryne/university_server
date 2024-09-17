import MainPage from "./mainPage"

const Layout = ({ children } : { children: React.ReactNode }) => {
    return(
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <header>
                <MainPage />
            </header>
            <main style={{ flex: 1 }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;