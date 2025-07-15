import Home from '@/pages/Home/Home';
import FavoriteProduct from '@/pages/FavoriteProduct/FavoriteProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorite" element={<FavoriteProduct />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
