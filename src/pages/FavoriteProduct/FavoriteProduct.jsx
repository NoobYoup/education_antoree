// pages/FavoritesPage.jsx
import { useEffect, useState } from 'react';
import useFavorites from '@/hooks/useFavorites';
import { getAllProducts } from '@/services/productService';
import ProductCard from '@/components/Products/ProductCard';
import Skeleton from 'react-loading-skeleton';

function FavoritesPage() {
    const { getFavoriteIds, isFavorite } = useFavorites();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const { products } = await getAllProducts({ limit: 100 }); // lấy tất cả
                const ids = getFavoriteIds();
                const filtered = products.filter((p) => ids.includes(p.id));
                setFavoriteProducts(filtered);
            } catch (err) {
                console.error('Lỗi khi lấy sản phẩm yêu thích:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="mb-4">Sản phẩm yêu thích</h2>

            {loading ? (
                <div className="row">
                    {favoriteProducts.length > 0 &&
                        favoriteProducts.map((_, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
                                <Skeleton height={350} />
                            </div>
                        ))}
                </div>
            ) : favoriteProducts.length === 0 ? (
                <p className="text-center text-muted">Bạn chưa yêu thích sản phẩm nào.</p>
            ) : (
                <div className="row">
                    {favoriteProducts.length > 0 &&
                        favoriteProducts.map((product) => (
                            <ProductCard key={product.id} product={product} isFavorite={isFavorite(product.id)} />
                        ))}
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;
