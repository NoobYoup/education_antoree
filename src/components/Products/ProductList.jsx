import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton';
import { getAllProducts, searchProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import ProductModalDetail from './ProductModalDetail';
import FilterPrice from '../FilterPrice/FilterPrice';

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

    const [filterPrice, setFilterPrice] = useState('all');

    const fetchData = async () => {
        setLoading(true);
        try {
            let productsData = [];
            let total = 0;
            if (debouncedSearchTerm) {
                const res = await searchProducts(debouncedSearchTerm, page, limit);
                productsData = res.products;
                total = res.total;
            } else {
                const res = await getAllProducts({ page, limit });
                productsData = res.products;
                total = res.total;
            }
            const filteredProducts = applyFilters(productsData);
            setProducts(filteredProducts);
            setNoResult(filteredProducts.length === 0);
            setTotalProducts(total);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    // fetch data khi trang thay đổi
    useEffect(() => {
        fetchData();
    }, [page, debouncedSearchTerm, limit]);

    // reset page về 1 khi đổi từ khóa tìm kiếm
    useEffect(() => {
        setPage(1);
    }, [debouncedSearchTerm]);

    // fetch data khi filter thay đổi
    useEffect(() => {
        fetchData();
        setPage(1); // reset về trang 1 khi đổi filter
    }, [filterPrice]);

    // xử lý chuyển trang
    const handlePageChange = ({ selected }) => {
        setPage(selected + 1);
    };

    // tính số trang
    const pageCount = Math.ceil(totalProducts / limit);

    // xử lý xem chi tiết sản phẩm
    const handleViewDetail = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // xử lý đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // áp dụng filter
    const applyFilters = (products) => {
        let filtered = [...products];

        if (filterPrice === 'under5') {
            filtered = filtered.filter((p) => p.price < 5);
        } else if (filterPrice === '5to10') {
            filtered = filtered.filter((p) => p.price >= 5 && p.price <= 10);
        } else if (filterPrice === 'over10') {
            filtered = filtered.filter((p) => p.price > 10);
        }

        return filtered;
    };

    return (
        <div className="container my-5">
            <FilterPrice value={filterPrice} onChange={setFilterPrice} />
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
