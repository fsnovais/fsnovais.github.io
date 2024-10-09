import { Container, Row, Col } from "react-bootstrap";
import logo from '../assets/img/logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon4 from '../assets/img/nav-icon4.svg';

function Footer () {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-item_center">
                    <Col sm={6}>
                        <img src={logo}/>
                    </Col>
                    <Col sm={6} className="text-center text-sm_end">
                        <div className="social-icon">
                            <a target="blank" href='https://www.linkedin.com/in/felipesn17/'><img src={navIcon1} alt="Linkedin" /></a>
                            <a target="blank" href='https://github.com/fsnovais/'><img src={navIcon4} alt="Github" /></a>
                        </div>
                        <p>Copyright 2024. All Right Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer