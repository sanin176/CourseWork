import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons'

import {Card, Form, Button, Col} from "react-bootstrap";
import MyToast from "./MyToast";
import axios from 'axios';

export default class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.disciplineChange = this.disciplineChange.bind(this);
        this.submitDiscipline = this.submitDiscipline.bind(this);
    }

    initialState = {
        id: '',
        name: '',
        forWhichSpecialty: '',
        hoursLabs: '',
        hoursLecture: '',
        hoursPractice: '',
        hoursCourse: '',
        hoursExam: '',
        hoursZachet: ''
    };

    componentDidMount() {
        const disciplineId = +this.props.match.params.id;
        if(disciplineId){
            this.findDisciplineById(disciplineId);
        }
    }

    componentWillUpdate() {
        //this.setState({"show":false});
        console.log("actions >>>")
    }

    findDisciplineById = (disciplineId) => {
        axios.get('http://localhost:8080/discipline/'+disciplineId)
            .then(response => {
                console.log("Response: " + response.data + "!");
                if(response.data != null){
                    console.log(response.data);
                    this.setState ({
                        id: response.data.id,
                        name: response.data.name,
                        forWhichSpecialty: response.data.forWhichSpecialty,
                        hoursLabs: response.data.hoursLPL.hoursLabs,
                        hoursLecture: response.data.hoursLPL.hoursLecture,
                        hoursPractice: response.data.hoursLPL.hoursPractice,
                        hoursCourse: response.data.hoursZCE.hoursCourse,
                        hoursExam: response.data.hoursZCE.hoursExam,
                        hoursZachet: response.data.hoursZCE.hoursZachet
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

    resetDiscipline = () => {
        this.setState(() => this.initialState);
    };

    submitDiscipline = event => {
        event.preventDefault();

        const discipline = {
            name: this.state.name,
            forWhichSpecialty: this.state.forWhichSpecialty,
            hoursLPL: {
                id: this.state.id,
                hoursLabs: this.state.hoursLabs,
                hoursLecture: this.state.hoursLecture,
                hoursPractice: this.state.hoursPractice
            },
            hoursZCE: {
                id: this.state.id,
                hoursCourse: this.state.hoursCourse,
                hoursExam: this.state.hoursExam,
                hoursZachet: this.state.hoursZachet
            }
        };

        axios.post("http://localhost:8080/createDiscipline", discipline)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

    updateDiscipline = event => {
        event.preventDefault();

        const discipline = {
            id: this.state.id,
            name: this.state.name,
            forWhichSpecialty: this.state.forWhichSpecialty,
            hoursLPL: {
                id: this.state.id,
                hoursLabs: this.state.hoursLabs,
                hoursLecture: this.state.hoursLecture,
                hoursPractice: this.state.hoursPractice
            },
            hoursZCE: {
                id: this.state.id,
                hoursCourse: this.state.hoursCourse,
                hoursExam: this.state.hoursExam,
                hoursZachet: this.state.hoursZachet
            }
        };

        console.log(discipline);

        axios.put("http://localhost:8080/putDiscipline", discipline)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.disciplineList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

    disciplineChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    disciplineList = () => {
        return this.props.history.push("/listDis");
    };

    render() {
        const marginBottom = {
            marginBottom: "60px"
        }

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={this.state.method === "put" ? "Discipline Update Successfully." : "Discipline Saved Successfully."} type = {"success"}/>
                </div>

                <Card className={"border border-dark bg-light text-dark"} style={marginBottom}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Discipline" : "Add Discipline"}</Card.Header>
                    <Form onReset={this.resetDiscipline} onSubmit={this.state.id ? this.updateDiscipline : this.submitDiscipline} id="teacherFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="name"
                                                  value={this.state.name}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>For Which Specialty</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="forWhichSpecialty"
                                                  value={this.state.forWhichSpecialty}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline For Which Specialty"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Hours Labs</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="hoursLabs"
                                                  value={this.state.hoursLabs}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Hours Labs"/>
                                </Form.Group>

                            {/*</Form.Row>*/}
                            {/*<Form.Row>*/}

                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Hours Course</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="hoursCourse"
                                                  value={this.state.hoursCourse}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Hours Course"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Hours Lecture</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="hoursLecture"
                                                  value={this.state.hoursLecture}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Hours Lecture"/>
                                </Form.Group>
                            {/*</Form.Row>*/}
                            {/*<Form.Row>*/}

                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Hours Exam</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="hoursExam"
                                                  value={this.state.hoursExam}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Hours Exam"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Hours Practice</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="hoursPractice"
                                                  value={this.state.hoursPractice}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Hours Practice"/>
                                </Form.Group>
                            {/*</Form.Row>*/}

                            {/*<Form.Row>*/}

                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Hours Zachet</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="hoursZachet"
                                                  value={this.state.hoursZachet}
                                                  onChange={this.disciplineChange}
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Discipline Hours Zachet"/>
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.disciplineList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Discipline List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}