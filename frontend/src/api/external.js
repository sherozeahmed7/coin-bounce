import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=bitcoin AND blockchain&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
const CRYPTO_API_ENDPOINT = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&price_change_percentage=24h&sparkline=false";

export const getNews = async () => {
    try {
        const response = await axios.get(NEWS_API_ENDPOINT);
        return response.data.articles.slice(0, 15);
    } catch (error) {
        console.error("Error fetching news:", error);
        return null; // ✅ Return null in case of an error
    }
};

export const getCrypto = async () => {
    try {
        const response = await axios.get(CRYPTO_API_ENDPOINT);
        return response.data; // ✅ Return response data
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return []; // ✅ Return empty array instead of undefined `error`
    }
};
