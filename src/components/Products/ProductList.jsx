import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton';
import { getAllProducts, searchProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import ProductModalDetail from './ProductModalDetail';

const ProductList = ({ search }) => {
    const [products, setProducts] = useState([]);
    const [limit] = useState(30); // Mặc định 30 sản phẩm/trang
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [debouncedSearchTerm] = useDebounce(search, 400);
    const [noResult, setNoResult] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (debouncedSearchTerm) {
                const { products, total } = await searchProducts(debouncedSearchTerm, page, limit);
                setProducts(products);
                setTotalProducts(total);

                setNoResult(products.length === 0);
            } else {
                const { products, total } = await getAllProducts({ page, limit });
                setProducts(products);
                setTotalProducts(total);
                setNoResult(false);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page, debouncedSearchTerm, limit]);

    // Reset page về 1 khi đổi từ khóa tìm kiếm
    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm]);

    const handlePageChange = ({ selected }) => {
        setPage(selected + 1);
    };

    const pageCount = Math.ceil(totalProducts / limit);

    const handleViewDetail = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="container my-5">
            <div className="row">
                {loading ? (
                    products.length > 0 &&
                    products.map((_, index) => (
                        <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
                            <Skeleton height={350} />
                        </div>
                    ))
                ) : noResult ? (
                    <p className="text-center text-muted">Không tìm thấy sản phẩm nào phù hợp.</p>
                ) : (
                    products.length > 0 &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} onViewDetail={handleViewDetail} />
                    ))
                )}
            </div>
            <ProductModalDetail isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />

            <div className="d-flex justify-content-center mt-4">
                {totalProducts > 0 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Sau"
                        previousLabel="Trước"
                        onPageChange={handlePageChange}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        forcePage={page - 1}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductList;
