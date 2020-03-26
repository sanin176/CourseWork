package com.project.alex.Controllers;

import com.project.alex.ServiceDiscipline.Discipline;
import com.project.alex.ServiceHibernate.DisciplineRepository;
import com.project.alex.ServiceHibernate.TeacherRepository;
import com.project.alex.ServiceTeacher.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class TeacherController {

    @Autowired
    private Teacher teacher;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @RequestMapping(value = { "/createTeacher"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createTeacher(@RequestBody Teacher t){
        teacherRepository.save(t);
    }

    @RequestMapping(value = { "/createDiscipline"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDiscipline(@RequestBody Discipline d){
        //disciplineRepository.save(d);
        disciplineRepository.save(d);
    }

}
