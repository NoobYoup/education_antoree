import Navbar from '@/components/Navbar/Navbar';
import ProductList from '@/components/Products/ProductList';
import BackToTop from '@/components/BackToTop/BackToTop';
import { useState } from 'react';
import useFavorites from '@/hooks/useFavorites';

function Home() {
    const [search, setSearch] = useState('');
    const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

    return (
        <>
            <Navbar onSearch={setSearch} favoriteIds={favoriteIds} />
            <ProductList search={search} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
            <BackToTop />
        </>
    );
}

export default Home;
