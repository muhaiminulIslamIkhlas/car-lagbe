import React from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

import BlogList from "../components/UI/BlogList";
import CustomerPage from "../components/UI/template/customer/CustomerPage";

const Home = () => {
  return (
    <Helmet title="Home">
      <CustomerPage>
        <BecomeDriverSection />


        {/* =========== testimonial section =========== */}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-4 text-center">
                <h6 className="section__subtitle">Our clients says</h6>
                <h2 className="section__title">Testimonials</h2>
              </Col>

              <Testimonial />
            </Row>
          </Container>
        </section>

        {/* =============== blog section =========== */}
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">Explore our blogs</h6>
                <h2 className="section__title">Latest Blogs</h2>
              </Col>
              <BlogList />
            </Row>
          </Container>
        </section>
      </CustomerPage>
    </Helmet>
  );
};

export default Home;
