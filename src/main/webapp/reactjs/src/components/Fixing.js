import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons'

import {Card, Form, Button, Col} from "react-bootstrap";
import MyToast from "./MyToast";
import axios from 'axios';

export default class Fixing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disciplines : [],
            teachers : [],
            counter: 0,
            sizeName: 0,
            sizeDiscipline: 0,
            sizeHours: 0,
            sizeHours1: 0,
            optionsHandleTeacherName: 0,
            optionsHandleDisciplineName: 0,
            optionsHandleHoursName: "0",
            optionsHandleLessonName: "0",
            id: ''
        };

        //this.state = this.initialState;
        this.fixingChange = this.fixingChange.bind(this);
        this.submitFixing = this.submitFixing.bind(this);
    }

    initialState = () => {
        this.setState({
            id: '',
            sizeName: 0,
            sizeDiscipline: 0,
            sizeHours: 0,
            sizeHours1: 0,
            optionsHandleTeacherName: 0,
            optionsHandleDisciplineName: 0,
            optionsHandleHoursName: "0",
            optionsHandleLessonName: "0"
        });
    };

    componentDidMount() {
        this.findAllDisciplines();
        this.findAllTeachers();
        const fixingId = +this.props.match.params.id;
        if(fixingId){
            this.findFixingById(fixingId);
        }
    }

    findFixingById = (fixingId) => {
        axios.get('http://localhost:8080/fixing/'+fixingId)
            .then(response => {
                console.log("Response: " + response.data + "!");
                if(response.data != null){
                    console.log("otvet: " + response.data.id);

                    this.setState ({
                        id: response.data.id,
                        optionsHandleTeacherName: response.data.teacher.id,
                        optionsHandleDisciplineName: response.data.discipline.id,
                        optionsHandleHoursName: (response.data.viewWork === "Labs" ? "hoursLabs" :
                            (response.data.viewWork === "Lectures" ? "hoursLecture" : "hoursPractice")),
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

    resetFixing = () => {
        this.initialState();
    };

    submitFixing = event => {
        event.preventDefault();
        console.log("submitFixing");

        let disciplineFixing;
        let teacherFixing;

        this.state.disciplines.map((discipline, ind) => {
            return (Number(discipline.id) === Number(this.state.optionsHandleDisciplineName) ?
                (disciplineFixing = discipline) : null)
        });

        this.state.teachers.map((teacher, ind) => {
            return (Number(teacher.id) === Number(this.state.optionsHandleTeacherName) ?
                (teacherFixing = teacher) : null)
        });

        const fixing = {
            discipline: disciplineFixing,
            teacher: teacherFixing,
            hoursLPL: this.state.optionsHandleHoursName,
            viewWork: this.state.optionsHandleLessonName
        };

        axios.post("http://localhost:8080/createFixing", fixing)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.initialState();
    };

    updateFixing = event => {
        event.preventDefault();

        console.log("updateDiscipline");

        let disciplineFixing;
        let teacherFixing;

        this.state.disciplines.map((discipline, ind) => {
            return (Number(discipline.id) === Number(this.state.optionsHandleDisciplineName) ?
                (disciplineFixing = discipline) : null)
        });

        this.state.teachers.map((teacher, ind) => {
            return (Number(teacher.id) === Number(this.state.optionsHandleTeacherName) ?
                (teacherFixing = teacher) : null)
        });

        console.log("otvet1234: " + this.state.id)
        const fixing = {
            id: this.state.id,
            discipline: disciplineFixing,
            teacher: teacherFixing,
            hoursLPL: this.state.optionsHandleHoursName,
            viewWork: this.state.optionsHandleLessonName
        };

        axios.put("http://localhost:8080/putFixing", fixing)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.fixingList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.initialState();
    };

    findAllDisciplines = () => {
        fetch('http://localhost:8080/disciplines')
            .then(response => response.json())
            .then(data => {this.setState({disciplines: data})});
    };

    findAllTeachers = () => {
        fetch('http://localhost:8080/teachers')
            .then(response => response.json())
            .then(data => {this.setState({teachers: data})});
    };

    fixingChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fixingList = () => {
        return this.props.history.push("/listFix");
    };

    handleTeacherName = e =>{
        console.log(e.target.value);
        this.setState({optionsHandleTeacherName:e.target.value});
        e.target.blur();
    };

    handleDisciplineName = e =>{
        this.setState({optionsHandleDisciplineName:e.target.value});
        e.target.blur();
    };

    handleHoursName = e =>{
        this.setState({optionsHandleHoursName:e.target.value});
        e.target.blur();
    };

    render() {
        const marginBottom = {
            marginBottom: "60px"
        };

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={this.state.method === "put" ? "Discipline Update Successfully." : "Discipline Saved Successfully."} type = {"success"}/>
                </div>

                <Card className={"border border-dark bg-light text-dark"} style={marginBottom}>
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Discipline" : "Add Discipline"}
                    </Card.Header>
                    <Form onReset={this.resetFixing}
                          onSubmit={this.state.id ? this.updateFixing : this.submitFixing} id="teacherFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Name</Form.Label>
                                    <select className="form-control"
                                            size={this.state.sizeName}
                                            onFocus={() => {
                                                this.setState({sizeName: 5})
                                            }}
                                            onBlur={() => {
                                                this.setState({sizeName: 0})
                                            }}
                                            onChange={this.handleTeacherName}
                                            value={this.state.optionsHandleTeacherName}
                                    >
                                        <option value={0} disabled>Select Teacher Name</option>
                                        {
                                            this.state.allTeachers = this.state.teachers.map((teacher, ind) => {
                                                return (<option key={ind} value={teacher.id}>
                                                    {teacher.firstName} {teacher.secondName} {teacher.patronymic}
                                                </option>)
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Discipline</Form.Label>
                                    <select className="form-control"
                                            size={this.state.sizeDiscipline}
                                            onFocus={() => {
                                                this.setState({sizeDiscipline: 5})
                                            }}
                                            onBlur={() => {
                                                this.setState({sizeDiscipline: 0})
                                            }}
                                            onChange={this.handleDisciplineName}
                                            value={this.state.optionsHandleDisciplineName}
                                    >
                                        <option value={0} disabled>Select Discipline Name</option>
                                        {
                                            this.state.disciplines.map((discipline, ind) => {
                                                return (
                                                    <option key={ind} value={discipline.id}>{discipline.name}, reading
                                                        for
                                                        - {discipline.forWhichSpecialty}</option>)
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Discipline</Form.Label>
                                    <select className="form-control"
                                            size={this.state.sizeHours}
                                            onFocus={() => {
                                                this.setState({sizeHours: 3})
                                            }}
                                            onBlur={() => {
                                                this.setState({sizeHours: 0})
                                            }}
                                            onChange={this.handleHoursName}
                                            value={this.state.optionsHandleHoursName}
                                    >
                                        <option value={"0"} disabled>Select Hours</option>
                                        {
                                            this.state.disciplines.map((discipline, ind) => {
                                                return (Number(discipline.id) === Number(this.state.optionsHandleDisciplineName) ? (
                                                    <option key={ind} value={"hoursLabs"}>
                                                        {discipline.hoursLPL.hoursLabs}</option>
                                                ) : null)
                                            })
                                        }
                                        {
                                            this.state.disciplines.map((discipline, ind) => {
                                                return (Number(discipline.id) === Number(this.state.optionsHandleDisciplineName) ? (
                                                    <option key={ind} value={"hoursLecture"}>
                                                        {discipline.hoursLPL.hoursLecture}</option>
                                                ) : null)
                                            })
                                        }
                                        {
                                            this.state.disciplines.map((discipline, ind) => {
                                                return (Number(discipline.id) === Number(this.state.optionsHandleDisciplineName) ? (
                                                    <option key={ind} value={"hoursPractice"}>
                                                        {discipline.hoursLPL.hoursPractice}</option>
                                                ) : null)
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Job</Form.Label>
                                    <select disabled
                                            className="form-control"
                                    >
                                        <option>
                                            {
                                                this.state.optionsHandleHoursName === "0" ? (this.state.optionsHandleLessonName = "Job is selecting Automatic") :
                                                    (this.state.optionsHandleHoursName === "hoursLabs" ? (this.state.optionsHandleLessonName = "Labs") : (this.state.optionsHandleHoursName === "hoursLecture" ?
                                                        (this.state.optionsHandleLessonName = "Lectures") : (this.state.optionsHandleLessonName = "Practice")))
                                            }
                                        </option>

                                    </select>
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
                            <Button size="sm" variant="info" type="button" onClick={this.fixingList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Fixing List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>


            </div>
        );
    }
}