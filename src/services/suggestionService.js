import axios from 'axios';

const API_URL = 'https://dummyjson.com';

let cachedProducts = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 phút

// Lấy toàn bộ sản phẩm, có cache
async function fetchAllProducts() {
    const now = Date.now();
    if (cachedProducts && now - lastFetchTime < CACHE_TTL) {
        return cachedProducts;
    }
    const res = await axios.get(`${API_URL}/products?limit=0`); // limit=0 để lấy tất cả
    cachedProducts = res.data.products;
    lastFetchTime = now;
    return cachedProducts;
}

// Hàm gợi ý sản phẩm
export async function getSuggestedProducts({
    favorites = [],
    history = [],
    limit = 20,
    offset = 0,
    tagWeight = 10,
    ratingWeight = 2,
    dateWeight = 1,
} = {}) {
    try {
        const products = await fetchAllProducts();
        // Lấy tất cả tag từ favorites và history
        const tagSet = new Set();
        favorites.forEach((p) => {
            (p.tags || []).forEach((tag) => tagSet.add(tag));
        });
        history.forEach((p) => {
            (p.tags || []).forEach((tag) => tagSet.add(tag));
        });
        // Tìm ngày tạo mới nhất để chuẩn hóa điểm ngày tạo
        const maxDate = Math.max(...products.map((p) => new Date(p.meta?.createdAt || 0).getTime()));
        // Tính điểm cho từng sản phẩm
        const scored = products.map((p) => {
            let score = 0;
            // Ưu tiên tag
            if (p.tags && p.tags.some((tag) => tagSet.has(tag))) {
                score += tagWeight;
            }
            // Ưu tiên rating
            score += (p.rating || 0) * ratingWeight;
            // Ưu tiên ngày tạo mới
            if (p.meta?.createdAt) {
                const dateScore = new Date(p.meta.createdAt).getTime() / maxDate;
                score += dateScore * dateWeight;
            }
            return { ...p, _score: score };
        });
        // Sắp xếp theo điểm giảm dần
        scored.sort((a, b) => b._score - a._score);
        // Trả về theo limit/offset
        return scored.slice(offset, offset + limit);
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        // Nếu lỗi, trả về null để hiển thị toast
        return null;
    }
}
