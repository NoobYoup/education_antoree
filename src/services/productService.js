import axios from 'axios';

const API_URL = 'https://dummyjson.com';

const getAllProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);

    const { products, total, limit } = res.data;

    return { products, total, limit };
};

const searchProducts = async (query) => {
    const res = await axios.get(`${API_URL}/products/search`, {
        params: {
            q: query,
        },
    });

    const { products, total, limit } = res.data;

    return { products, total, limit };
};

export { getAllProducts, searchProducts };
