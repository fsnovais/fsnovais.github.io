import { useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import 'animate.css';
import bannerImg from '../assets/img/banner_img.png';

function Banner () {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ['Software Developer','Data Engineer'];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const typingSpeed = 200;
    const deletingSpeed = 100;
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker) };
    }, [text])

    const scrollToContact = () => {
        const contactSection = document.getElementById("connect");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }


    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(deletingSpeed);
        } else {
            setDelta(typingSpeed);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(typingSpeed);
        }
    }

    return (
        <section className="banner" id ='home'>
            <Container>
                <Row className="align-items-center row-reverse-mobile">
                    <Col xs = {12} md = {6} xl={7}>
                    <TrackVisibility>
                    {({ isVisible }) => 
                        <div className={isVisible ? "animate__animated animate_fadeIn" : ""}>
                            <div className="banner-title">
                                <span className="tagline">Welcome to my Portfolio</span>
                                <h1>{`Hi I'm Felipe Novais `}<span className="wrap">{text}</span></h1>
                            </div>
                            <p> A computer science graduate and developer. I love learning new things and strive to improve at least a little bit every day. If you improve by 1% each day, you'll be 365% better by the end of the year. I enjoy solving problems, simplifying things, and enhancing everything I see that isn't good enough.</p>
                            <button onClick={scrollToContact}>Let's connect <ArrowRightCircle size={24}/></button>
                        </div>}
                    </TrackVisibility>
                    </Col>
                    <Col xs = {12} md = {6} xl={4}>
                        <img src={bannerImg} alt="Headder Img"></img>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner;