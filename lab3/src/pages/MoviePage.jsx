import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import MovieFilter from "../components/Filter/MovieFilter";
import { movies } from "../data/movies";

export default function MoviePage() {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilterChange = ({ keyword, genre, sort }) => {
    let result = [...movies];

    // 🔎 Lọc theo từ khóa (title hoặc description)
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(kw) ||
          m.description.toLowerCase().includes(kw)
      );
    }

    // 🎭 Lọc theo thể loại
    if (genre && genre !== "All") {
      result = result.filter((m) => m.genre === genre);
    }

    // 📊 Sắp xếp
    switch (sort) {
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "year_asc":
        result.sort((a, b) => a.year - b.year);
        break;
      case "year_desc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "duration_asc":
        result.sort((a, b) => a.duration - b.duration);
        break;
      case "duration_desc":
        result.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }

    setFilteredMovies(result);
  };

  return (
    <div className="container mt-4" id="movies">
      <h2 className="text-center mb-4">🎞 Movie Collections</h2>

      <MovieFilter onFilterChange={handleFilterChange} />

      <Row xs={1} md={3} className="g-4">
        {filteredMovies.map((movie) => (
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
