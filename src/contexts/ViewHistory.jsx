import { createContext, useContext } from 'react';
import useViewHistory from '@/hooks/useViewHistory';

const ViewHistoryContext = createContext();

export const ViewHistoryProvider = ({ children }) => {
    const { clearHistory, history, addToHistory, getHistory } = useViewHistory();

    return (
        <ViewHistoryContext.Provider value={{ clearHistory, history, addToHistory, getHistory }}>
            {children}
        </ViewHistoryContext.Provider>
    );
};

export const useViewHistoryContext = () => useContext(ViewHistoryContext);
