import { useState, useEffect } from 'react';

const STORAGE_KEY = 'viewedProducts';
const MAX_ITEMS = 10;

export default function useViewHistory() {
    // lấy dữ liệu từ localStorage khi load lại trang
    const [history, setHistory] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // Ghi lại mỗi lần thay đổi
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }, [history]);

    // Thêm sản phẩm mới
    const addToHistory = (product) => {
        const now = Date.now();
        const newItem = { ...product, viewedAt: now };

        setHistory((prev) => {
            // Bỏ trùng theo ID
            const filtered = prev.filter((item) => item.id !== product.id);
            const updated = [newItem, ...filtered];

            // Giới hạn 10 sản phẩm
            return updated.slice(0, MAX_ITEMS);
        });
    };

    // Xóa toàn bộ lịch sử
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const getHistory = () => history;

    return {
        history,
        addToHistory,
        getHistory,
        clearHistory,
    };
}
