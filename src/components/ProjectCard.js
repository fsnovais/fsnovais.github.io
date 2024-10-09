import { Col } from "react-bootstrap";

function ProjectCard({ title, description, imgUrl, url }) {
    return (
        <Col sm={6} md={4}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }} // Removes default styles
            >
                <div className="proj-imgbx">
                    <img src={imgUrl} alt={title} />
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span>{description}</span>
                    </div>
                </div>
            </a>
        </Col>
    );
}

export default ProjectCard;
