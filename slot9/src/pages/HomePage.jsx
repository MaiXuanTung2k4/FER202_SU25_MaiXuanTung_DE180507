import HomeCarousel from "../components/Carousel/HomeCarousel";
import MyFooter from "../components/Footer/MyFooter";

export default function HomePage() {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "1rem" }}>Welcome to Movie World</h2>
      <HomeCarousel />
      <MyFooter
        author="TraLTB"
        email="traltb@fe.edu.vn"
        linkGithub="Movies Management Project"
      />
    </div>
  );
}
