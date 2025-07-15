import { useState, useEffect } from 'react';

const STORAGE_KEY = 'favoriteProducts';

export default function useFavorites() {
    // lấy dữ liệu từ localStorage khi load lại trang
    const [favoriteIds, setFavoriteIds] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // lưu dữ liệu vào localStorage khi có thay đổi
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    }, [favoriteIds]);

    // kiểm tra sản phẩm có trong danh sách yêu thích không
    const isFavorite = (id) => favoriteIds.includes(id);

    // thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
    const toggleFavorite = (id) => {
        setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
    };

    // lấy danh sách id sản phẩm yêu thích
    const getFavoriteIds = () => [...favoriteIds]; // copy tránh mutation

    return {
        favoriteIds,
        isFavorite,
        toggleFavorite,
        getFavoriteIds,
    };
}
