import React from "react";
import { Carousel, Badge } from "react-bootstrap";
import { carouselMovies } from "../../data/carousel";

export default function HomeCarousel() {
  if (!Array.isArray(carouselMovies) || carouselMovies.length === 0) return null;

  return (
    <Carousel interval={3000} fade>
      {carouselMovies.map((m) => (
        <Carousel.Item key={m.id}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "420px",
              overflow: "hidden",
            }}
          >
            {/* Ảnh nền */}
            <img
              className="d-block w-100"
              src={m.poster}
              alt={m.title}
              style={{ height: "100%", objectFit: "cover", filter: "brightness(80%)" }}
            />

            {/* Lớp overlay gradient (mờ dần từ đen lên) */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "40%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            ></div>

            {/* Chữ hiển thị trên ảnh */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "30px",
                right: "30px",
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "12px 18px",
                borderRadius: "12px",
                maxWidth: "750px",
              }}
            >
              <h3 style={{ fontWeight: "600", marginBottom: "6px" }}>
                {m.title}{" "}
                <Badge bg="info" className="text-dark mx-1">
                  {m.genre}
                </Badge>
                <Badge bg="light" text="dark">
                  {m.year}
                </Badge>
              </h3>
              <p style={{ marginBottom: 0, fontSize: "0.95rem", color: "#e0e0e0" }}>
                {m.description}
              </p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
