import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFrom from "./components/EmployeeFrom";
import React from 'react';

function App() {
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center mt-3">
          <Col lg={12} >
            <Jumbotron><p className="title">Employee Info</p></Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <EmployeeFrom />
          </Col>
          <Col lg={8}>
          <EmployeeTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default App;


