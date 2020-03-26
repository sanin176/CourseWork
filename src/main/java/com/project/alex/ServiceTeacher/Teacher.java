package com.project.alex.ServiceTeacher;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;

@Data
@Component
@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "teach")
    private int id;
    private String firstName;
    private String secondName;
    private String patronymic;
    @Enumerated(EnumType.STRING)
    private Position position;
    @Enumerated(EnumType.STRING)
    private Sex sex;
    private Date date;
}


//{
//        "id": 1,
//        "firstName": "Alex",
//        "secondName": "Zdit",
//        "patronymic": "Leon",
//        "position": "TraineeTeacher",
//        "Sex": "Male",
//        "Date": "2020-03-25"
//        }