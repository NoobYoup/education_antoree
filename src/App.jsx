import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import FavoriteProduct from '@/pages/FavoriteProduct/FavoriteProduct';
import MainLayout from '@/layouts/MainLayout';
import History from '@/pages/History/History';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/favorite" element={<FavoriteProduct />} />
                        <Route path="/history" element={<History />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
