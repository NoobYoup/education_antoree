import { useViewHistoryContext } from '@/contexts/ViewHistory';
import ProductCard from '@/components/Products/ProductCard';
import { useEffect, useState } from 'react';
import { useFavoritesContext } from '@/contexts/FavoritesContext';

function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN'); // hoặc bạn có thể format theo kiểu bạn thích
}

function History() {
    const { clearHistory, history } = useViewHistoryContext();
    const { isFavorite, toggleFavorite } = useFavoritesContext();

    const [viewed, setViewed] = useState([]);

    useEffect(() => {
        setViewed(history);
    }, [history]);

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lịch sử xem sản phẩm</h2>
                {viewed.length > 0 && (
                    <button className="btn btn-outline-danger" onClick={clearHistory}>
                        Xoá toàn bộ lịch sử
                    </button>
                )}
            </div>

            {viewed.length === 0 ? (
                <p className="text-center text-muted">Bạn chưa xem sản phẩm nào.</p>
            ) : (
                <div className="row">
                    {viewed.length > 0 &&
                        viewed.map((item) => (
                            <>
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    isFavorite={isFavorite(item.id)}
                                    toggleFavorite={toggleFavorite}
                                />
                                {/* <p className="text-muted mt-1" style={{ fontSize: '0.9rem' }}>
                                    Đã xem lúc: {formatDateTime(item.viewedAt)}
                                </p> */}
                            </>
                        ))}
                </div>
            )}
        </div>
    );
}

export default History;
