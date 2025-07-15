import ProductList from '@/components/Products/ProductList';
import { useSearch } from '@/contexts/SearchContext.jsx';
import useFavorites from '@/hooks/useFavorites';

function Home() {
    const { search } = useSearch();
    const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <>
            <ProductList search={search} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        </>
    );
}

export default Home;
