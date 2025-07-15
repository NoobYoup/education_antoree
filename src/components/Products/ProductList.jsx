import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton';
import { getAllProducts, searchProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import ProductModalDetail from './ProductModalDetail';

const ProductList = ({ search }) => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(0);
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
                const { products } = await searchProducts(debouncedSearchTerm);
                setProducts(products);
                setNoResult(products.length === 0); // set noResult khi không tìm thấy sản phẩm
            } else {
                const { products, total, limit } = await getAllProducts({ page });
                setProducts(products);
                setTotalProducts(total);
                setLimit(limit);
                setNoResult(false); // reset noResult khi không tìm thấy sản phẩm
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page, debouncedSearchTerm]);

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
