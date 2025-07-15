import { createContext, useContext, useState } from 'react';
import ProductModalDetail from '@/components/Products/ProductModalDetail';

const ProductModalContext = createContext();

export const ProductModalProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => setSelectedProduct(product);
    const closeModal = () => setSelectedProduct(null);

    return (
        <ProductModalContext.Provider value={{ selectedProduct, openModal, closeModal }}>
            {children}
            <ProductModalDetail isOpen={!!selectedProduct} product={selectedProduct} onClose={closeModal} />
        </ProductModalContext.Provider>
    );
};

export const useProductModal = () => useContext(ProductModalContext);
