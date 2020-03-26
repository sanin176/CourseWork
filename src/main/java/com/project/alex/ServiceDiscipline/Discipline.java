package com.project.alex.ServiceDiscipline;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Data
@Entity
@Component
public class Discipline {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "discip")
    private int id;
    private String name;
    private String forWhichSpecialty;
    @OneToOne(cascade = CascadeType.ALL)
    private HoursLPL hoursLPL;
    @OneToOne(cascade = CascadeType.ALL)
    private HoursZCE hoursZCE;
}
