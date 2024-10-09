import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import project1 from "../assets/img/project-1.jpg"
import project2 from "../assets/img/project-2.gif"
import project3 from "../assets/img/project-3.jpg"
import project4 from "../assets/img/project-4.jpg"
import project5 from "../assets/img/project-5.jpg"
import project6 from "../assets/img/project-6.jpg"
import project8 from "../assets/img/project-8.jpg"
import project9 from "../assets/img/project-9.jpg"
import project10 from "../assets/img/project-10.jpg"
import dbtproject from "../assets/img/dbt-project.jpg"
import googleads from "../assets/img/google-ads.png"
import captivate from "../assets/img/captivate.jpeg"
import sharepoint from "../assets/img/sharepoint.jpg"

function Projects () {

  const backend = [
    {title: "Google Ads Custom Snowflake Connector",
      description: "Python",
      imgUrl: googleads,
      url: 'https://github.com/fsnovais/public_files/blob/main/handler.py'
    },
    {title: "Captivate API Custom Snowflake Connector",
      description: "Python",
      imgUrl: captivate,
      url: 'https://github.com/fsnovais/captivate-snowflake-connector'

    },
    {title: "Sharepoint Snowflake Connector",
      description: "Python",
      imgUrl: sharepoint,
      url: 'https://github.com/fsnovais/sharepoint-snowflake-connector'
    },
  ]
  const frontend = [
    {
      title: "Blind Bird",
      description: "HTML, CSS, JS",
      imgUrl: project1,
      url: 'https://blindbird.netlify.app/'
    },
    {
      title: "Proffy",
      description: "React",
      imgUrl: project2,
      url: 'https://github.com/fsnovais/Proffy'
    },
    {
      title: "NCC",
      description: "React",
      imgUrl: project3,
      url: 'https://github.com/fsnovais/NCC-2021'
    },
    {
      title: "Sala de aula online",
      description: "HTML, CSS, JS",
      imgUrl: project4,
      url: 'https://github.com/fsnovais/sala-de-aula-online'
    },
    {
      title: "Protfolio Template",
      description: "React",
      imgUrl: project5,
      url: 'https://github.com/fsnovais/React-Portfolio'
    },
    {
      title: "Github Explorer",
      description: "React",
      imgUrl: project6,
      url: 'https://github.com/fsnovais/GoStack-11/tree/main/projetos/project-02'
    },
    {
      title: "Go Barber",
      description: "React",
      imgUrl: project8,
      url: 'https://github.com/fsnovais/GoStack-11/tree/main/projetos/project-03/gobarber-web'
    },
    {
      title: "Quiz Mulher Antifrágil",
      description: "React",
      imgUrl: project9,
      url: 'https://github.com/fsnovais/quiz-mulher-antifragil'
    },
    {
      title: "Quiz Temperamentos",
      description: "React",
      imgUrl: project10,
      url: 'https://github.com/fsnovais/Temperamentos'
    },
  ];

  const data = [
    {
      title: "Google Analytics Custom Reporting",
      description: "dbt",
      imgUrl: dbtproject,
      url: 'https://github.com/fsnovais/google_analytics_dbt'
    }
  ]

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>Here are some of my projects spanning front-end, back-end, data engineering, and various other cool stuffs that I enjoy building.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Back-end</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Front-end</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Data</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          backend.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Row>
                        {
                          frontend.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Row>
                        {
                          data.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Projects