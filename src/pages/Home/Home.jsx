import Navbar from '@/components/Navbar/Navbar';
import ProductList from '@/components/Products/ProductList';
import { useState } from 'react';

function Home() {
    const [search, setSearch] = useState('');

    return (
        <>
            <Navbar onSearch={setSearch} />
            <ProductList search={search} />
        </>
    );
}

export default Home;
