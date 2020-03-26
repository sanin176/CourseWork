package com.project.alex.ServiceDiscipline;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Data
@Entity
public class HoursZCE {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "hoursZ")
    private int id;
    private int hoursCourse;
    private int hoursExam;
    private int hoursZachet;
}
