import React, {Component} from "react";
import {Card, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

export default class DisciplineList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disciplines : [],
            counter: 0
        }
    }

    componentDidMount() {
        this.findAllDisciplines()
    }

    assembleDisciplines = () => {
        let disciplines =this.state.disciplines.map((discipline) => {
            return (

                {
                    amount: ++this.state.counter,
                    id: discipline.id,
                    name: discipline.name,
                    forWhichSpecialty: discipline.forWhichSpecialty,
                    hoursLabs: discipline.hoursLPL.hoursLabs,
                    hoursLecture: discipline.hoursLPL.hoursLecture,
                    hoursPractice: discipline.hoursLPL.hoursPractice,
                    hoursCourse: discipline.hoursZCE.hoursCourse,
                    hoursExam: discipline.hoursZCE.hoursExam,
                    hoursZachet: discipline.hoursZCE.hoursZachet,
                    // date: teacher.date.replace(/(\d+).(\d+).(\d+).*/,'$3-$2-$1'),
                    // date: (new Date(Date.parse((teacher.date)))).toDateString('i'),
                    action: <ButtonGroup>
                        <Link to={"editDis/"+discipline.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteDiscipline.bind(this, discipline.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )

        });

        return disciplines;

    };

    deleteDiscipline = (disciplineId) => {
        axios.delete('http://localhost:8080/deleteDiscipline/'+disciplineId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    //alert("Teacher deleted successfully.");
                    this.setState({
                        //teachers: this.state.teachers.filter(teacher => teacher.id !== teacherId)
                        disciplines: this.state.disciplines.filter(discipline => discipline.id !== disciplineId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    findAllDisciplines = () => {
        fetch('http://localhost:8080/disciplines')
            .then(response => response.json())
            .then(data => {this.setState({disciplines: data});})
            .then(async() => {
                this.setState({
                    disciplines:this.assembleDisciplines(),
                    isLoading:false })
            });
    };

    render() {

        const data = {
            columns: [
                {
                    label: 'Id',
                    field: 'amount',
                    width: 30
                },
                {
                    label: 'Name',
                    field: 'name',
                    width: 100
                },
                {
                    label: 'For specialty',
                    field: 'forWhichSpecialty',
                    width: 120
                },
                {
                    label: 'Hours labs',
                    field: 'hoursLabs',
                    width: 100
                },
                {
                    label: 'Hours lecture',
                    field: 'hoursLecture',
                    width: 120
                },
                {
                    label: 'Hours practice',
                    field: 'hoursPractice',
                    width: 130
                },
                {
                    label: 'Hours course',
                    field: 'hoursCourse',
                    width: 120
                },
                {
                    label: 'Hours exam',
                    field: 'hoursExam',
                    width: 120
                },
                {
                    label: 'Hours zachet',
                    field: 'hoursZachet',
                    width: 120
                },
                {
                    label: 'Action',
                    field: 'action',
                    width: 70
                }
            ],

            rows: this.state.disciplines

        };

        const marginBottom = {
            marginBottom: "60px"
        }

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Discipline Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-light text-info"} style={marginBottom}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Discipline List</Card.Header>
                    <Card.Body>
                        <MDBDataTable className="text-info bg-light"
                                      scrollX
                                      maxHeight="40vh"
                                      striped
                                      bordered
                                      small
                                      hover
                                      theadColor={"text-dark"}
                                      tbodyColor={"text-primary"}
                                      data={data}
                                      variant="dark"
                                      pagination="false"
                        />

                    </Card.Body>
                </Card>
            </div>
        )
    }
}