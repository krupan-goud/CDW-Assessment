import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [getUserDetails, setUserDetails] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const URL = 'https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098';

    axios.get(URL)
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const administrators = getUserDetails.filter(user => user.role === 'admin');
  const members = getUserDetails.filter(user => user.role === 'member');

  const filteredAdministrators = administrators.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App teamContainer">
      <div>
        <Navbar expand="lg" className="navBar">
          <Container>
            <Col lg={8} md={6} xs={12} className='text-start'>
              <Navbar.Brand style={{ color: "white" }}>Teams</Navbar.Brand>
            </Col>
            <Col lg={4} md={6} xs={12} className='text-end'>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto text-end searchMain">
                  <div className='searchInfo text-end' >
                    <IoSearch className="searchIcon" />
                    <Form.Control
                      type="text"
                      value={searchQuery}
                      onChange={handleInputChange}
                      placeholder="Search..."
                      className="searchInput"
                    />
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Container>
          <div className="fixed-icon">
            <div className="circle">
              <span className="plus">+</span>
            </div>
          </div>
        </Navbar>
      </div>

      <Container>
        <Row>
          <Col lg={12} md={12} xs={12}>
            <Container className='d-flex justify-content-start mt-4'>
              <h4 className='headingLabel mb-4'>Administrators</h4>
            </Container>
          </Col>
        </Row>
        <Row >
          {filteredAdministrators.map((user, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12}>
              <Card className="mb-4" style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4} className="d-flex align-items-center justify-content-center">
                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
                      <img src={user.img} alt={user.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />                    </div>
                  </Col>
                  <Col lg={8} md={8} sm={8} xs={8} className="d-flex align-items-center">
                    <Row>
                      <Col lg={12} md={12} sm={12} className='mt-2'>
                        <p className='nameLabel'>{`${user.first_name} ${user.last_name}`}</p>
                        <p className='emailLabel'>{`${user.email}`}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
        <hr />
        <Row>
          <Col lg={12} md={12} xs={12}>
            <Container className='d-flex justify-content-start mt-3'>
              <h4 className='headingLabel mb-4'>Members</h4>
            </Container>
          </Col>
        </Row>
        <Row className='mb-4'>
          {filteredMembers.map((user, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12}>
              <Card className="mb-4" style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={4} className="d-flex align-items-center justify-content-center">
                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
                      <img src={user.img} alt={user.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />                    </div>
                  </Col>
                  <Col lg={8} md={8} sm={8} xs={8} className="d-flex align-items-center">
                    <Row>
                      <Col lg={12} md={12} sm={12} className='mt-2'>
                        <p className='nameLabel'>{`${user.first_name} ${user.last_name}`}</p>
                        <p className='emailLabel'>{`${user.email}`}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div >
  );
}

export default App;
