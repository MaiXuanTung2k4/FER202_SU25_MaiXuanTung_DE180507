import Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter() {
  const author = "TungMX";
  const email = "tungmxde180507@fpt.edu.vn";
  const linkGithub = "https://github.com/MaiXuanTung2k4/FER202_SU25_MaiXuanTung_DE180507";

  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email}</p>
      <p>
        &copy; {new Date().getFullYear()} {author}. All rights reserved.
      </p>
      <Button variant="link" href={linkGithub} target="_blank">
        My Github: {linkGithub}
      </Button>
    </footer>
  );
}

export default MyFooter;
