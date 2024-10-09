import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.png";

function Contact() {
    const [formDetails, setFormDetails] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page redirection

        setButtonText('Sending...');

        const response = await fetch("https://api.staticforms.xyz/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accessKey: "5146a43f-d4c6-4923-bb47-22a6fabd45f9", // Replace with your accessKey
                name: formDetails.name,
                email: formDetails.email,
                message: formDetails.message,
                replyTo: formDetails.email
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            setStatus({ success: true, message: "Message sent successfully" });
            setButtonText("Send");
            setFormDetails({ name: "", email: "", message: "" });
        } else {
            setStatus({ success: false, message: "Something went wrong, please try again later." });
            setButtonText("Send");
        }
    };

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className={"px-1"}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formDetails.name}
                                        onChange={(e) => onFormUpdate('name', e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col sm={6} className={"px-1"}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formDetails.email}
                                        onChange={(e) => onFormUpdate('email', e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col className={"px-1"}>
                                    <textarea
                                        rows="6"
                                        name="message"
                                        placeholder="Message"
                                        value={formDetails.message}
                                        onChange={(e) => onFormUpdate('message', e.target.value)}
                                        required
                                    />
                                    <button type="submit">
                                        <span>{buttonText}</span>
                                    </button>
                                    {status.message && (
                                    <Col>
                                        <p className={status.success ? "success" : "danger"}>
                                            {status.message}
                                        </p>
                                    </Col>
                                )}
                                </Col>
                                
                            </Row>
                        </form>
                    </Col>
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us" />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Contact;
