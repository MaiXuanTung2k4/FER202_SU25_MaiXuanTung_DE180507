import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function MovieFilter({ onFilterChange }) {
  const [keyword, setKeyword] = useState("");
  const [yearRange, setYearRange] = useState("all"); // all, le2000, 2001_2015, gt2015
  const [sort, setSort] = useState("title"); // title, title_desc, year_asc, year_desc, duration_asc, duration_desc

  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange({ keyword: keyword.trim(), yearRange, sort });
    }
  }, [keyword, yearRange, sort, onFilterChange]);

  return (
    <div className="card mb-4 p-3 shadow-sm">
      <h5 className="mb-3">🔎 Filter & Search</h5>

      <Form.Group className="mb-3" controlId="searchKeyword">
        <InputGroup>
          <InputGroup.Text>🔎</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by title or description..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

      <div className="row g-3">
        <div className="col-md-6">
          <Form.Label>Year range</Form.Label>
          <Form.Select
            value={yearRange}
            onChange={(e) => setYearRange(e.target.value)}
          >
            <option value="all">All years</option>
            <option value="le2000">Year ≤ 2000</option>
            <option value="2001_2015">2001 - 2015</option>
            <option value="gt2015">Year &gt; 2015</option>
          </Form.Select>
        </div>

        <div className="col-md-6">
          <Form.Label>Sort by</Form.Label>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="title">Title A → Z</option>
            <option value="title_desc">Title Z → A</option>
            <option value="year_desc">Year ↓ (newest first)</option>
            <option value="year_asc">Year ↑ (oldest first)</option>
            <option value="duration_desc">Duration ↓ (longer first)</option>
            <option value="duration_asc">Duration ↑ (shorter first)</option>
          </Form.Select>
        </div>
      </div>
    </div>
  );
}
