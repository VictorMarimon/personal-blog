import { Container } from "@mui/material";
import "./App.css";
import Footer from "./components/footer/footer";
import NavBar from "./components/navbar/Navbar";
import "./languages/i18n";
import articles from "./assets/data/articles";
import Article from "./components/posts/Article";
import CustomPagination from "./components/pagination/pagination";
import MainArticle from "./components/posts/MainArticle";

function App() {
  return (
    <>
      <NavBar />
      <MainArticle date="2024-06-01" title="Main Article Title" content="This is the main article content." />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "fit-content",
            }}
          >
            <Article {...article} />
            <br />
          </div>
        ))}
      </Container>
      <CustomPagination
        totalPages={Math.ceil(articles.length / 5)}
        currentPage={1}
        onPageChange={(page) => console.log("Page changed to:", page)}
      />
      <Footer />
    </>
  );
}

export default App;
