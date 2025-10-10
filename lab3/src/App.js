import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import FooterPage from "./pages/FooterPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div>
      <HomePage />
      <MoviePage />
      <FooterPage />
    </div>
  );
}

export default App;
