import React, {Component} from "react";
import {Card, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

export default class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers : [],
            counter: 0
        }
    }

    componentDidMount() {
        this.findAllTeachers()
    }

    assembleTeachers = () => {
        let teachers =this.state.teachers.map((teacher) => {
            return (
                {
                    amount: ++this.state.counter,
                    id: teacher.id,
                    firstName: teacher.firstName,
                    secondName: teacher.secondName,
                    patronymic: teacher.patronymic,
                    position: teacher.position,
                    sex: teacher.sex,
                    date: teacher.date.replace(/(\d+).(\d+).(\d+).*/,'$3-$2-$1'),
                    //date: (new Date(Date.parse((teacher.date)))).toDateString('i'),
                    action: <ButtonGroup>
                        <Link to={"edit/"+teacher.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteTeacher.bind(this, teacher.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )

        });

        return teachers;

    }

    deleteTeacher = (teacherId) => {
        axios.delete('http://localhost:8080/deleteTeacher/'+teacherId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    //alert("Teacher deleted successfully.");
                    this.setState({
                        //teachers: this.state.teachers.filter(teacher => teacher.id !== teacherId)
                        teachers: this.state.teachers.filter(teacher => teacher.id !== teacherId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    }

    findAllTeachers = () => {
        fetch('http://localhost:8080/teachers')
            .then(response => response.json())
            .then(data => {this.setState({teachers: data})})
            .then(async() => {
                this.setState({
                    teachers:this.assembleTeachers(),
                    isLoading:false })
                //console.log(this.state.tableRows);
            });
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
                    label: 'First Name',
                    field: 'firstName',
                    width: 100
                },
                {
                    label: 'Second Name',
                    field: 'secondName',
                    width: 120
                },
                {
                    label: 'Patronymic',
                    field: 'patronymic',
                    width: 100
                },
                {
                    label: 'Position',
                    field: 'position',
                    width: 120
                },
                {
                    label: 'Sex',
                    field: 'sex',
                    width: 60
                },
                {
                    label: 'Date',
                    field: 'date',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action',
                    width: 70
                }
            ],

            rows: this.state.teachers

        };

        const marginBottom = {
            marginBottom: "60px"
        }

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Teacher Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-light text-info"} style={marginBottom}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Teacher List</Card.Header>
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