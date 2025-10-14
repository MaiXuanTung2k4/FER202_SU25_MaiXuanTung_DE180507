import React, { useState } from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieFilter from "../components/Filter/MovieFilter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../components/Movie/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleFilterChange = ({ keyword, yearRange, sort }) => {
    let result = [...movies];

    // filter by keyword (title or description)
    if (keyword) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (m) =>
          (m.title && m.title.toLowerCase().includes(kw)) ||
          (m.description && m.description.toLowerCase().includes(kw))
      );
    }

    // filter by yearRange
    if (yearRange && yearRange !== "all") {
      if (yearRange === "le2000") {
        result = result.filter((m) => Number(m.year) <= 2000);
      } else if (yearRange === "2001_2015") {
        result = result.filter((m) => Number(m.year) >= 2001 && Number(m.year) <= 2015);
      } else if (yearRange === "gt2015") {
        result = result.filter((m) => Number(m.year) > 2015);
      }
    }

    // sort
    if (sort) {
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
    }

    setFilteredMovies(result);
  };

  return (
    <div id="home">
      <HomeCarousel />

      <div className="container mt-4">
        <h2 className="mb-3">Featured Movies</h2>

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
    </div>
  );
}
