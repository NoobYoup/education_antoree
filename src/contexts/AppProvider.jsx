import { SearchProvider } from './SearchContext.jsx';
import { ProductModalProvider } from './ProductModalContext.jsx';

const AppProvider = ({ children }) => {
    return (
        <SearchProvider>
            <ProductModalProvider>{children}</ProductModalProvider>
        </SearchProvider>
    );
};

export default AppProvider;
