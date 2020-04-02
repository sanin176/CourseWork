import React, {Component} from "react";
import {Card, Table, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import MyToast from "./MyToast";

export default class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers : []
        }
    }

    componentDidMount() {
        this.findAllTeachers()
    }

    assembleTeachers= () => {

        var dateFormat = require('dateformat');

        let teachers =this.state.teachers.map((teacher) => {

            return (
                {
                    id: teacher.id,
                    firstName: teacher.firstName,
                    secondName: teacher.secondName,
                    patronymic: teacher.patronymic,
                    position: teacher.position,
                    sex: teacher.sex,
                    date: teacher.date.replace(/(\d+).(\d+).(\d+).*/,'$3-$2-$1'),
                    //date: (new Date(Date.parse((teacher.date)))).toDateString('i'),
                    action: <ButtonGroup>
                        <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteTeacher.bind(this, teacher.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )

        });

        return teachers;

    }

    deleteTeacher = (teacherId) => {
        axios.delete('http://localhost:8080/delete/'+teacherId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    alert("Teacher deleted successfully.");
                    this.setState({
                        teachers: this.state.teachers.filter(teacher => teacher.id !== teacherId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    }

    findAllTeachers = () => {
        fetch('http://localhost:8080/teacher')
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
                    field: 'id',
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

        }
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{show: this.state.show, message: "Teacher Deleted Successfully.", type:"danger"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Teacher List</Card.Header>
                    <Card.Body>
                        <MDBDataTable className="text-info bg-light"
                                      scrollX
                            //scrollY
                                      maxHeight="40vh"
                            //maxWidth=""
                                      striped
                                      bordered
                                      small
                                      hover
                                      theadColor={"text-dark"}
                                      tbodyColor={"text-primary"}

                            // borderless
                            // //barReverse
                            // autoWidth
                            // displayEntries
                            // entries={8}
                            // fixed
                            // entrieslabel={"tak"}
                            // //info={false}
                            // noBottomColumns={false}
                            // pagesAmount={1}
                            // paging={true}
                            // responsive={false}
                            // responsiveSm={true}
                            // searchingLabel={"text"}
                            // onSearch={"taks"}

                                      data={data}
                                      variant="dark"
                            //searching={false}
                            //sorting="false"
                                      pagination="false"
                                      red-text
                        />
                        {/*<Table id="dt-basic-checkbox" bordered hover striped variant="dark">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>Id</th>*/}
                        {/*        <th>First Name</th>*/}
                        {/*        <th>Second Name</th>*/}
                        {/*        <th>Patronymic</th>*/}
                        {/*        <th>Position</th>*/}
                        {/*        <th>Sex</th>*/}
                        {/*        <th>Date</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {*/}
                        {/*        this.state.teachers.length === 0 ?*/}
                        {/*            <tr align="center">*/}
                        {/*                <td colSpan="7">Teachers Available</td>*/}
                        {/*            </tr> :*/}
                        {/*            this.state.teachers.map((teacher) => (*/}
                        {/*                <tr key={teacher.id}>*/}
                        {/*                    <td>{teacher.id}</td>*/}
                        {/*                    <td>{teacher.firstName}</td>*/}
                        {/*                    <td>{teacher.secondName}</td>*/}
                        {/*                    <td>{teacher.patronymic}</td>*/}
                        {/*                    <td>{teacher.position}</td>*/}
                        {/*                    <td>{teacher.sex}</td>*/}
                        {/*                    <td>{teacher.date}</td>*/}
                        {/*                </tr>*/}
                        {/*            ))*/}
                        {/*    }*/}


                        {/*    /!*<tr align="center">*!/*/}
                        {/*    /!*    <td colSpan="7">No Teachers Available</td>*!/*/}
                        {/*    /!*</tr>*!/*/}
                        {/*    </tbody>*/}
                        {/*</Table>*/}

                        {/*<MDBDataTable scrollY*/}
                        {/*              maxHeight="200px"*/}
                        {/*              striped*/}
                        {/*              bordered*/}
                        {/*              small*/}
                        {/*              hover*/}
                        {/*              variant="dark">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>Id</th>*/}
                        {/*        <th>First Name</th>*/}
                        {/*        <th>Second Name</th>*/}
                        {/*        <th>Patronymic</th>*/}
                        {/*        <th>Position</th>*/}
                        {/*        <th>Sex</th>*/}
                        {/*        <th>Date</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {*/}
                        {/*        this.state.teachers.length === 0 ?*/}
                        {/*            <tr align="center">*/}
                        {/*                <td colSpan="7">Teachers Available</td>*/}
                        {/*            </tr> :*/}
                        {/*            this.state.teachers.map((teacher) => (*/}
                        {/*                <tr key={teacher.id}>*/}
                        {/*                    <td>{teacher.id}</td>*/}
                        {/*                    <td>{teacher.firstName}</td>*/}
                        {/*                    <td>{teacher.secondName}</td>*/}
                        {/*                    <td>{teacher.patronymic}</td>*/}
                        {/*                    <td>{teacher.position}</td>*/}
                        {/*                    <td>{teacher.sex}</td>*/}
                        {/*                    <td>{teacher.date}</td>*/}
                        {/*                </tr>*/}
                        {/*            ))*/}
                        {/*    }*/}


                        {/*    /!*<tr align="center">*!/*/}
                        {/*    /!*    <td colSpan="7">No Teachers Available</td>*!/*/}
                        {/*    /!*</tr>*!/*/}
                        {/*    </tbody>*/}
                        {/*</MDBDataTable>*/}

                    </Card.Body>
                </Card>
            </div>
        )
    }
}