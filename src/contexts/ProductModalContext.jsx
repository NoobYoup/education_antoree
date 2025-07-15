import { createContext, useContext, useState } from 'react';
import ProductModalDetail from '@/components/Products/ProductModalDetail';
import useViewHistory from '@/hooks/useViewHistory';

const ProductModalContext = createContext();

export const ProductModalProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToHistory } = useViewHistory(); // hook để lưu lịch sử xem sản phẩm

    const openModal = (product) => {
        setSelectedProduct(product);
        addToHistory(product); // thêm sản phẩm mỗi khi mở modal
    };
    const closeModal = () => setSelectedProduct(null);

    return (
        <ProductModalContext.Provider value={{ selectedProduct, openModal, closeModal }}>
            {children}
            <ProductModalDetail isOpen={!!selectedProduct} product={selectedProduct} onClose={closeModal} />
        </ProductModalContext.Provider>
    );
};

export const useProductModal = () => useContext(ProductModalContext);
