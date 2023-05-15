import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";

const MainLayout = () => {
    return (
        <main className='App'>
            <Outlet />
            <Footer />
        </main>
    );
};

export default MainLayout;
