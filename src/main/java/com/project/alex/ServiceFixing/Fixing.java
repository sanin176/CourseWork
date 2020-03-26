package com.project.alex.ServiceFixing;

import com.project.alex.ServiceDiscipline.Discipline;
import com.project.alex.ServiceDiscipline.HoursLPL;
import com.project.alex.ServiceTeacher.Teacher;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Fixing {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "fix")
    private int id;
    @OneToOne(cascade = CascadeType.ALL)
    private Discipline discipline;
    @OneToOne(cascade = CascadeType.ALL)
    private Teacher teacher;
    @OneToOne(cascade = CascadeType.ALL)
    private HoursLPL hoursLPL;
}
