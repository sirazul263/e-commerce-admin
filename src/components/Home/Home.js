import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../Layout/Layout";

const Home = (props) => {
  return (
    <div>
      <Layout sidebar>
        <p>Home</p>
      </Layout>
    </div>
  );
};

export default Home;
