import ProductList from '@/components/Products/ProductList';
import { useSearch } from '@/contexts/SearchContext.jsx';
import { useFavoritesContext } from '@/contexts/FavoritesContext.jsx';

function Home() {
    const { search } = useSearch();
    const { isFavorite, toggleFavorite } = useFavoritesContext();

    return (
        <>
            <ProductList search={search} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        </>
    );
}

export default Home;
