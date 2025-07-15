import { SearchProvider } from './SearchContext.jsx';
import { ProductModalProvider } from './ProductModalContext.jsx';
import { FavoritesProvider } from './FavoritesContext.jsx';
import { ViewHistoryProvider } from './ViewHistory.jsx';

const AppProvider = ({ children }) => {
    return (
        <SearchProvider>
            <FavoritesProvider>
                <ViewHistoryProvider>
                    <ProductModalProvider>{children}</ProductModalProvider>
                </ViewHistoryProvider>
            </FavoritesProvider>
        </SearchProvider>
    );
};

export default AppProvider;
