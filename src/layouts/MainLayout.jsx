import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import BackToTop from '@/components/Button/BackToTop';

function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="min-vh-100">
                <Outlet />
            </main>
            <BackToTop />
        </>
    );
}

export default MainLayout;
