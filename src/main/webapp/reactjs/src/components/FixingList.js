import React, {Component} from "react";
import {Card, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

export default class FixingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixings : [],
            counter: 0
        }
    }

    componentDidMount() {
        this.findAllDisciplines()
    }

    assembleDisciplines = () => {
        let fixings =this.state.fixings.map((fixing) => {
            return (
                {
                    amount: ++this.state.counter,
                    id: fixing.id,
                    teacherName: (fixing.teacher.firstName + " " + fixing.teacher.secondName + " " + fixing.teacher.patronymic),
                    //secondName: (fixing.teacher.secondName + " " + fixing.teacher.forWhichSpecialty),
                    disciplineName: (fixing.discipline.name + ", for Specialty -> " + fixing.discipline.forWhichSpecialty),
                    hours:fixing.discipline.hoursLPL[fixing.hoursLPL],
                    viewWorkName: fixing.viewWork,
                    action: <ButtonGroup>
                        <Link to={"editFix/"+fixing.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteFixing.bind(this, fixing.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                    </ButtonGroup>
                }
            )

        });

        return fixings;

    };

    deleteFixing = (fixingId) => {
        axios.delete('http://localhost:8080/deleteFixing/'+fixingId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 500);
                    //alert("Teacher deleted successfully.");
                    this.setState({
                        //teachers: this.state.teachers.filter(teacher => teacher.id !== teacherId)
                        fixings: this.state.fixings.filter(fixing => fixing.id !== fixingId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    findAllDisciplines = () => {
        fetch('http://localhost:8080/fixings')
            .then(response => response.json())
            //.then(data => console.log(data))
            .then(data => {this.setState({fixings: data});})
            .then(async() => {
                this.setState({
                    fixings:this.assembleDisciplines(),
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
                },
                {
                    label: 'Action',
                    field: 'action',
                    width: 70
                }


            //     amount: ++this.state.counter,
            // id: fixing.id,
            // name: fixing.teacher.name,
            // viewWork: fixing.discipline.firstName,


                //     name: discipline.name,
                // forWhichSpecialty: discipline.forWhichSpecialty,
                // hoursLabs: discipline.hoursLPL.hoursLabs,
                // hoursLecture: discipline.hoursLPL.hoursLecture,
                // hoursPractice: discipline.hoursLPL.hoursPractice,
                // hoursCourse: discipline.hoursZCE.hoursCourse,
                // hoursExam: discipline.hoursZCE.hoursExam,
                // hoursZachet: discipline.hoursZCE.hoursZachet,





                // {
                //     label: 'Hours lecture',
                //     field: 'hoursLecture',
                //     width: 120
                // },
                // {
                //     label: 'Hours practice',
                //     field: 'hoursPractice',
                //     width: 130
                // },
                // {
                //     label: 'Hours course',
                //     field: 'hoursCourse',
                //     width: 120
                // },
                // {
                //     label: 'Hours exam',
                //     field: 'hoursExam',
                //     width: 120
                // },
                // {
                //     label: 'Hours zachet',
                //     field: 'hoursZachet',
                //     width: 120
                // },
                // {
                //     label: 'Action',
                //     field: 'action',
                //     width: 70
                // }
            ],

            rows: this.state.fixings

        };

        const marginBottom = {
            marginBottom: "60px"
        }

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Fixing Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-light text-info"} style={marginBottom}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Fixing List</Card.Header>
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
                            //red-text
                        />

                    </Card.Body>
                </Card>
            </div>
        )
    }
}