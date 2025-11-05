import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { MovieProvider, useMovieState, useMovieDispatch } from "../contexts/MovieContext";
import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";
import movieApi from "../api/movieAPI";

const MovieManagerContent = () => {
  const { genres, movies } = useMovieState();
  const { dispatch } = useMovieDispatch(); //  dùng dispatch thay vì setMovies

  const [filters, setFilters] = useState({
    genreId: "all",
    year: "",
    duration: "",
  });

  //  tải tất cả phim ban đầu
  useEffect(() => {
    fetchMovies();
  }, []);

  //  hàm tải danh sách phim (có thể có query)
  const fetchMovies = async (query = "") => {
    try {
      const res = await movieApi.get(`/movies${query}`);
      dispatch({ type: "SET_MOVIES", payload: res.data }); //  cập nhật qua reducer
    } catch (err) {
      console.error("Lỗi khi tải danh sách phim:", err);
    }
  };

  //  thay đổi filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  //  khi bấm nút lọc
  const handleApplyFilters = () => {
    let params = [];

    // json-server chỉ hiểu đúng field có trong db.json
    if (filters.genreId !== "all" && filters.genreId !== "") {
      params.push(`genreId=${filters.genreId}`);
    }

    if (filters.year.trim() !== "") {
      params.push(`year=${filters.year}`);
    }

    if (filters.duration.trim() !== "") {
      params.push(`duration_gte=${filters.duration}`);
    }

    const query = params.length > 0 ? "?" + params.join("&") : "";
    fetchMovies(query);
  };

  //  reset filter
  const handleReset = () => {
    setFilters({ genreId: "all", year: "", duration: "" });
    fetchMovies();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🎬 Movie Manager</h2>

      <MovieForm />

      {/* Bộ lọc */}
      <Row className="mb-4 align-items-end">
        <Col md={3}>
          <Form.Group controlId="genreId">
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              name="genreId"
              value={filters.genreId}
              onChange={handleFilterChange}
            >
              <option value="all">Tất cả</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="year">
            <Form.Label>Năm</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={filters.year}
              placeholder="Nhập năm (vd: 2022)"
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="duration">
            <Form.Label>Thời lượng tối thiểu</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={filters.duration}
              placeholder="Phút (vd: 120)"
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>

        <Col md={3} className="d-flex gap-2">
          <Button
            variant="primary"
            className="w-50"
            onClick={handleApplyFilters}
          >
            🔍 Lọc phim
          </Button>
          <Button variant="secondary" className="w-50" onClick={handleReset}>
            🔄 Reset
          </Button>
        </Col>
      </Row>

      <h4>Danh sách Phim</h4>
      <MovieTable movies={movies} />
    </Container>
  );
};

//  Bọc toàn bộ trong MovieProvider
const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
