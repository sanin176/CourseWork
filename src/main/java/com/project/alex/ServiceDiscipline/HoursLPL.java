package com.project.alex.ServiceDiscipline;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Data
@Entity
public class HoursLPL {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "hoursL")
    private int id;
    private int hoursLabs;
    private int hoursLecture;
    private int hoursPractice;
}
