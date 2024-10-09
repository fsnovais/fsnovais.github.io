import { Container, Col, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import colorSharp from "../assets/img/color-sharp.png"

import snowflake from "../assets/img/snowflake.svg"
import aws from "../assets/img/AWS.svg"
import dbt from "../assets/img/dbt.svg"
import react from "../assets/img/react.svg"
import github from "../assets/img/github.svg"
import jenkins from "../assets/img/Jenkins.svg"
import python from "../assets/img/python.svg"
import bigquery from "../assets/img/bigquery.svg"
import sql from "../assets/img/sql.svg"


function Skills () {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return (
        <section className='skill' id='skills'>
            <Container>
                <Row>
                    <Col>
                        <div className='skill-bx'>
                            <h2>
                                Skills
                            </h2>
                            <p>I have a strong background in dbt, Snowflake, and BigQuery, specializing in ELT processes across various projects. Also I have experience with React for creating dynamic user interfaces and utilize HTML, CSS, and JavaScript to develop responsive web applications. Additionally, I leverage AWS for cloud solutions, with hands-on experience in S3, Lambda functions, and custom API data ingestion.</p>
                            <Carousel responsive={responsive} infinite={true} className='skill-slider'>
                                <div className='item'>
                                    <img src={snowflake} alt="Image"/>
                                        <h5>Snowflake</h5>
                                </div>
                                <div className='item'>
                                    <img src={aws} alt="Image"/>
                                        <h5>Amazon Web Services</h5>
                                </div>
                                <div className='item'>
                                    <img src={dbt} alt="Image"/>
                                        <h5>Data Build Tool</h5>
                                </div>
                                <div className='item'>
                                    <img src={react} alt="Image"/>
                                        <h5>React</h5>
                                </div>
                                <div className='item'>
                                    <img src={github} alt="Image"/>
                                        <h5>Github</h5>
                                </div>
                                <div className='item'>
                                    <img src={jenkins} alt="Image"/>
                                        <h5>Jenkins</h5>
                                </div>
                                <div className='item'>
                                    <img src={python} alt="Image"/>
                                        <h5>Python</h5>
                                </div>
                                <div className='item'>
                                    <img src={bigquery} alt="Image"/>
                                        <h5>BigQuery</h5>
                                </div>
                                <div className='item'>
                                    <img src={sql} alt="Image"/>
                                        <h5>SQL</h5>
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
            <img className='background-image-left' src={colorSharp}></img>
        </section>
    )
}

export default Skills;