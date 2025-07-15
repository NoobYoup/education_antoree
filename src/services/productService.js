import axios from 'axios';

const API_URL = 'https://dummyjson.com';

const getAllProducts = async ({ page = 1, limit = 30 }) => {
    // tính toán số lượng sản phẩm cần bỏ qua (skip) dựa trên trang hiện tại
    // ví dụ: trang 1, limit 30: skip = (1-1) * 30 = 0 sản phẩm
    // trang 2, limit 30: skip = (2-1) * 30 = 30 sản phẩm
    // trang 3, limit 30: skip = (3-1) * 30 = 60 sản phẩm
    // ...
    const skip = (page - 1) * limit;
    const res = await axios.get(`${API_URL}/products`, {
        params: { limit, skip },
    });
    const { products, total } = res.data;
    return { products, total };
};

const searchProducts = async (query, page = 1, limit = 30) => {
    const skip = (page - 1) * limit;
    const res = await axios.get(`${API_URL}/products/search`, {
        params: { q: query, limit, skip },
    });
    const { products, total } = res.data;
    return { products, total };
};

export { getAllProducts, searchProducts };
