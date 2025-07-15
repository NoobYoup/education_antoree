import { SearchProvider } from './SearchContext.jsx';

const AppProvider = ({ children }) => {
    return <SearchProvider>{children}</SearchProvider>;
};

export default AppProvider;
