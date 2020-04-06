package com.project.alex.ServiceFixing;

import com.project.alex.ServiceDiscipline.Discipline;
import com.project.alex.ServiceTeacher.Teacher;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Fixing {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "fix")
    private int id;
    @OneToOne(fetch = FetchType.EAGER)
    private Discipline discipline;
    @OneToOne(fetch = FetchType.EAGER)
    private Teacher teacher;
    private String hoursLPL;
    @Enumerated(EnumType.STRING)
    private ViewWork viewWork;
}
