import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function MoviePage() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">🎬 My Movies Collection</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard
              img={movie.poster}
              title={movie.title}
              text={movie.description}
              genre={movie.genre}
              year={movie.year}
              country={movie.country}
              duration={movie.duration}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
