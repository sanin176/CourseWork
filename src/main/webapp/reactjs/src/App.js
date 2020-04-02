import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome"
import Footer from "./components/Footer"
import Book from "./components/Book";
import BookList from "./components/BookList";
import Teacher from "./components/Teacher";
import TeacherList from "./components/TeacherList";

function App() {
    const marginTop = {
        marginTop: "20px"
    }

  return (
      <Router>
          <NavigationBar/>
          <Container>
              <Row>
                  <Col lg={12} style={marginTop}>
                      <Switch>
                          <Route path="/" exact component={Welcome}/>
                          {/*<Route path="/add" exact component={Book}/>*/}
                          {/*<Route path="/list" exact component={BookList}/>*/}

                          <Route path="/add" exact component={Teacher}/>
                          <Route path="/list" exact component={TeacherList}/>
                      </Switch>
                  </Col>
              </Row>
          </Container>
          <Footer/>
      </Router>

  );
}

export default App;
