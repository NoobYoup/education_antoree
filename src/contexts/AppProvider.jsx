import { SearchProvider } from './SearchContext.jsx';
import { ProductModalProvider } from './ProductModalContext.jsx';
import { FavoritesProvider } from './FavoritesContext.jsx';

const AppProvider = ({ children }) => {
    return (
        <SearchProvider>
            <FavoritesProvider>
                <ProductModalProvider>{children}</ProductModalProvider>
            </FavoritesProvider>
        </SearchProvider>
    );
};

export default AppProvider;
