import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome"
import Footer from "./components/Footer"
import Teacher from "./components/Teacher";
import TeacherList from "./components/TeacherList";
import Discipline from "./components/Discipline";
import DisciplineList from "./components/DisciplineList";
import Fixing from "./components/Fixing";
import FixingList from "./components/FixingList";
import Autorization from "./components/Autorization";
import PageForTeacher from "./components/PageForTeacher";

function App() {
    const marginTop = {
        marginTop: "20px"
    };

  return (
      <Router>
          <NavigationBar/>
          <Container>
              <Row>
                  <Col lg={12} style={marginTop}>
                      <Switch>
                          <Route path="/" exact component={Welcome}/>

                          <Route path="/add" exact component={Teacher}/>
                          <Route path="/edit/:id" exact component={Teacher}/>
                          <Route path="/list" exact component={TeacherList}/>

                          <Route path="/addDis" exact component={Discipline}/>
                          <Route path="/editDis/:id" exact component={Discipline}/>
                          <Route path="/listDis" exact component={DisciplineList}/>

                          <Route path="/addFix" exact component={Fixing}/>
                          <Route path="/editFix/:id" exact component={Fixing}/>
                          <Route path="/listFix" exact component={FixingList}/>

                          <Route path="/autorization" exact component={Autorization}/>
                          <Route path="/pageTeacher" exact component={PageForTeacher}/>
                      </Switch>
                  </Col>
              </Row>
          </Container>
          <Footer/>
      </Router>

  );
}

export default App;
