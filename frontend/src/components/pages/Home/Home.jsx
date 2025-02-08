import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { getNews } from "../../../api/external";
import Loader from "../../Loader/Loader";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // IIFE
    (async () => {
      try {
        const response = await getNews();
        setArticles(response);
      } catch (error) {
        // return error
        console.error("Error fetching news:", error);
        setArticles([]);
      }
    })();
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (articles.length == 0) {
    return <Loader text="homepage" />;
  }

  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div
            key={article.url}
            className={styles.card}
            onClick={() => handleCardClick(article.url)}
          >
            <img src={article.urlToImage} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
