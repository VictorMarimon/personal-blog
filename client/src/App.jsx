import "./App.css";
import Footer from "./components/footer/footer";
import NavBar from "./components/navbar/Navbar";
import "./languages/i18n";
import articles from "./assets/data/articles";
import CustomPagination from "./components/pagination/pagination";
import MainArticle from "./components/posts/MainArticle";
import MansoryArticle from "./components/posts/MansoryArticle";

function App() {
  return (
    <>
      <NavBar />
      <MainArticle date="2024-06-01" title="Main Article Title" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dictum tortor finibus sollicitudin egestas. Integer sodales lacus augue, non semper velit dictum sed. Etiam scelerisque lorem nec erat fringilla, et varius augue lacinia. Pellentesque in ligula a sem consequat congue. Donec egestas arcu eu lectus porta, vitae varius nisi tempor." />
      <MansoryArticle articles={articles} />
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
