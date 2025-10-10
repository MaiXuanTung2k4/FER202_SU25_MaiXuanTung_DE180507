import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
  return (
    <div className="footer">
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>
        Footer Example Page
      </h2>
      <MyFooter
        author="TungMX"
        email="tungmxde180507@fpt.edu.vn"
        linkGithub="https://github.com/MaiXuanTung2k4/FER202_SU25_MaiXuanTung_DE180507"
      />
    </div>
  );
}
