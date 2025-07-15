import { SearchProvider } from './SearchContext.jsx';
import { ProductModalProvider } from './ProductModalContext.jsx';
import { FavoritesProvider } from './FavoritesContext.jsx';

const AppProvider = ({ children }) => {
    return (
        <SearchProvider>
            <ProductModalProvider>
                <FavoritesProvider>{children}</FavoritesProvider>
            </ProductModalProvider>
        </SearchProvider>
    );
};

export default AppProvider;
