import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, fetchNews } from "../features/counter/counterSlice";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  align-item: center;
`;

const Input = styled.input`
  width: 94%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const NewsCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Description = styled.p`
  font-size: 1em;
  margin-bottom: 15px;
`;

const Button = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Articles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);
  const searchTerm = useSelector((state) => state.news.searchTerm);

  useEffect(() => {
    dispatch(fetchNews(searchTerm));
  }, [dispatch, searchTerm]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Container>
      <Input
        type="Text"
        placeholder="Cari Berita..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <CardContainer>
        {articles.map((article) => (
          <NewsCard key={article.url}>
            {article.urlToImage && (
              <Image src={article.urlToImage} alt={article.title} />
            )}
            <Title>{article.title}</Title>
            <Description>{article.description}</Description>
            <Button
              href={article.url}
              target="_blank"
              rel="noopener noreferrer">
              Read More
            </Button>
          </NewsCard>
        ))}
      </CardContainer>
    </Container>
  );
};

export default Articles;
