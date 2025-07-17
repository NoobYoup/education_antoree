import { useState } from 'react';
import Button from '@/components/Button/Button';
import ProductCard from '@/components/Products/ProductCard';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProducts } from '@/services/suggestionService';
import { useFavoritesContext } from '@/contexts/FavoritesContext';
import { useViewHistoryContext } from '@/contexts/ViewHistory';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import buttonStyles from '@/components/Button/Button.module.scss';

const cxButton = classNames.bind(buttonStyles);

const SUGGEST_LIMIT = 10;

function Suggestion() {
    const { favorites } = useFavoritesContext();
    const { history } = useViewHistoryContext();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const handleSuggest = async () => {
        setLoading(true);
        const result = await getSuggestedProducts({
            favorites,
            history,
            limit: SUGGEST_LIMIT,
            offset: 0,
        });
        setLoading(false);
        if (!result) {
            toast.error('Không thể lấy gợi ý lúc này');
            setSuggestions([]);
            setHasMore(false);
            return;
        }
        setSuggestions(result);
        setOffset(SUGGEST_LIMIT);
        setHasMore(result.length === SUGGEST_LIMIT);
    };

    const handleLoadMore = async () => {
        setLoading(true);
        const result = await getSuggestedProducts({
            favorites,
            history,
            limit: SUGGEST_LIMIT,
            offset,
        });
        setLoading(false);
        if (!result) {
            toast.error('Không thể lấy gợi ý lúc này');
            return;
        }
        setSuggestions((prev) => [...prev, ...result]);
        setOffset(offset + SUGGEST_LIMIT);
        setHasMore(result.length === SUGGEST_LIMIT);
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Danh sách gợi ý sản phẩm</h1>
                <Button className={`${cxButton('button')} bg-success mb-3`} type="button" onClick={handleSuggest}>
                    <i className="fa-solid fa-robot me-2"></i>
                    Gợi ý sản phẩm
                </Button>
            </div>
            <div className="row">
                {loading
                    ? Array.from({ length: SUGGEST_LIMIT }).map((_, idx) => (
                          <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={idx}>
                              <Skeleton height={350} />
                          </div>
                      ))
                    : suggestions.map((product) => (
                          <ProductCard key={product.id} product={product} onViewDetail={() => {}} />
                      ))}
            </div>
            {hasMore && !loading && suggestions.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Button className={`${cxButton('button')} bg-secondary`} onClick={handleLoadMore}>
                        Xem thêm
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Suggestion;
