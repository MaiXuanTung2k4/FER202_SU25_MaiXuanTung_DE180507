import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.css";

export default function MovieCard({ img, title, text, genre, year, country, duration }) {
  return (
    <Card className="shadow-sm movie-card h-100">
      <Card.Img variant="top" src={img} alt={title} style={{ height: 250, objectFit: "cover" }} />
      <Card.Body>
        <Card.Title>
          {title} <Badge bg="info">{genre}</Badge>
        </Card.Title>
        <Card.Text style={{ fontSize: "0.9rem" }}>{text}</Card.Text>
        <div className="text-muted small mb-2">
          Year: {year} | {country} | {duration} mins
        </div>
        <div className="d-flex justify-content-between">
          <Button variant="primary" size="sm">
            Details
          </Button>
          <Button variant="outline-warning" size="sm">
            Add to Favourite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
