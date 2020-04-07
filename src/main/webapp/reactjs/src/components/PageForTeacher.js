import React, {Component} from "react";
import '../styles/style.css'
import {Card, Form, Jumbotron} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {MDBDataTable} from "mdbreact";

export default class PageForTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixings : [],
            counter: 0,
            value: ''
        };

        this.handleTextLine = this.handleTextLine.bind(this);
    }

    componentDidMount() {
        this.findAllDisciplines()
    }

    assembleFixings = () => {
        let fixings =this.state.fixings.map((fixing) => {
            return (
                {
                    amount: ++this.state.counter,
                    id: fixing.id,
                    teacherName: (fixing.teacher.firstName + " " + fixing.teacher.secondName + " " + fixing.teacher.patronymic),
                    //secondName: (fixing.teacher.secondName + " " + fixing.teacher.forWhichSpecialty),
                    disciplineName: (fixing.discipline.name + ", for Specialty -> " + fixing.discipline.forWhichSpecialty),
                    hours:fixing.discipline.hoursLPL[fixing.hoursLPL],
                    viewWorkName: fixing.viewWork
                }
            )

        });

        return fixings;

    };

    findAllDisciplines = () => {
        fetch('http://localhost:8080/fixings')
            .then(response => response.json())
            //.then(data => console.log(data))
            .then(data => {this.setState({fixings: data});})
            .then(async() => {
                this.setState({
                    fixings:this.assembleFixings(),
                    isLoading:false })
            });
    };

    handleTextLine(event) {
        this.setState({value: event.target.value});
        console.log(event.target.value);
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Id',
                    field: 'amount',
                    width: 30
                },
                {
                    label: 'Teacher',
                    field: 'teacherName',
                    width: 160
                },
                {
                    label: 'Discipline',
                    field: 'disciplineName',
                    width: 220
                },
                {
                    label: 'Hours',
                    field: 'hours',
                    width: 70
                },
                {
                    label: 'View Work',
                    field: 'viewWorkName',
                    width: 100
                }
            ],

            rows: this.state.fixings

        };

        const marginBottom = {
            marginBottom: "60px"
        };

        return (
            <div>
                <Jumbotron style={marginBottom}>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">First, Second name and Patronymic</label>
                            <input type="email" className="widthLineSearchFSP mr-auto form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Input please..."
                                   value={this.state.value} onChange={this.handleTextLine}/>
                            <small id="emailHelp" className="form-text text-muted">Absolute protection.</small>
                        </div>
                    </Form>
                    <hr className="my-4"/>
                    <Card className={"border border-dark bg-light text-info"}>
                        <Card.Header><FontAwesomeIcon icon={faList}/> Fixing List</Card.Header>
                        <Card.Body>
                            <MDBDataTable className="text-info bg-light"
                                          scrollX
                                          maxHeight="30vh"
                                          striped
                                          bordered
                                          small
                                          hover
                                          theadColor={"text-dark"}
                                          tbodyColor={"text-primary"}
                                          data={data}
                                          variant="dark"
                                          searching={false}
                                          pagination="false"
                            />

                        </Card.Body>
                    </Card>
                </Jumbotron>
            </div>
        );
    }
}