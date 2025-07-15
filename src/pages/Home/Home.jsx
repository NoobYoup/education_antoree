import Navbar from '@/components/Navbar/Navbar';
import ProductList from '@/components/Products/ProductList';
import BackToTop from '@/components/BackToTop/BackToTop';
import { useState } from 'react';

function Home() {
    const [search, setSearch] = useState('');

    return (
        <>
            <Navbar onSearch={setSearch} />
            <ProductList search={search} />
            <BackToTop />
        </>
    );
}

export default Home;
