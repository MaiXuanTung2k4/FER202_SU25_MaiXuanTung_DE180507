import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MyFooter from "../components/Footer/MyFooter";

export default function HomePage() {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "1rem" }}>
        Welcome to Movie World
      </h2>
      <HomeCarousel />
      <div className="mt-4 p-3">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Thêm thông tin về các bộ sưu tập phim nổi bật ở đây.
        </p>
      </div>
      <MyFooter
        author="TungMX"
        email="tungmxde180507@fpt.edu.vn"
        linkGithub="https://github.com/MaiXuanTung2k4/FER202_SU25_MaiXuanTung_DE180507"
      />
    </div>
  );
}
