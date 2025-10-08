import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";

export default function HomeCarousel() {
  const movies = [
    {
      title: "Avengers: Endgame",
      genre: "Action",
      img: "https://i.imgur.com/UYiroysl.jpg",
    },
    {
      title: "Frozen II",
      genre: "Animation",
      img: "https://i.imgur.com/W9qH5uM.jpg",
    },
    {
      title: "Parasite",
      genre: "Thriller",
      img: "https://i.imgur.com/4xQKRLl.jpg",
    },
  ];

  return (
    <Carousel fade interval={2000}>
      {movies.map((movie, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={movie.img}
            alt={movie.title}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <Badge bg="info">{movie.genre}</Badge>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
