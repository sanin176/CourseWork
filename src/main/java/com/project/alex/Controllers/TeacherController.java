package com.project.alex.Controllers;

import com.project.alex.ServiceDiscipline.Discipline;
import com.project.alex.ServiceFixing.Fixing;
import com.project.alex.ServiceHibernate.DisciplineRepository;
import com.project.alex.ServiceHibernate.FixingRepository;
import com.project.alex.ServiceHibernate.TeacherRepository;
import com.project.alex.ServiceTeacher.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Autowired
    private FixingRepository fixingRepository;

    @RequestMapping(value = { "/createTeacher"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createTeacher(@RequestBody Teacher t){
        teacherRepository.save(t);
    }

    @RequestMapping(value = { "/teachers"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Teacher> getAllTeacher(){
        return teacherRepository.findAll();
    }

    @RequestMapping(value = { "/teacher/{id}"}, method = RequestMethod.GET)
    public @ResponseBody Optional<Teacher> getTeacherByID(@PathVariable("id") int id){
        System.out.println(teacherRepository.findById(id).toString());
        return teacherRepository.findById(id);
    }

    @RequestMapping(value = { "/deleteTeacher/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteTeacherByID(@PathVariable("id") int id){
        fixingRepository.deleteTeacher(teacherRepository.findById(id));
        teacherRepository.deleteById(id);
    }

    @RequestMapping(value = { "/putTeacher"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void putTeacher(@RequestBody Teacher t){
        teacherRepository.save(t);
    }




    @RequestMapping(value = { "/createDiscipline"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createDiscipline(@RequestBody Discipline d){
        disciplineRepository.save(d);
    }

    @RequestMapping(value = { "/disciplines"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Discipline> getAllDiscipline(){
        return disciplineRepository.findAll();
    }

    @RequestMapping(value = { "/discipline/{id}"}, method = RequestMethod.GET)
    public @ResponseBody Optional<Discipline> getDisciplinesByID(@PathVariable("id") int id){
        return disciplineRepository.findById(id);
    }

    @RequestMapping(value = { "/deleteDiscipline/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteDisciplineByID(@PathVariable("id") int id){
        fixingRepository.deleteDiscipline(disciplineRepository.findById(id));
        disciplineRepository.deleteById(id);
    }

    @RequestMapping(value = { "/putDiscipline"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void putDiscipline(@RequestBody Discipline d){
        disciplineRepository.save(d);
    }




    @RequestMapping(value = {"/createFixing"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createFixing(@RequestBody Fixing f){
        System.out.println("----------------------------------------------Otvet: ");
        fixingRepository.save(f);
    }

    @RequestMapping(value = { "/fixings"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Fixing> getAllFixing(){
        return fixingRepository.findAll();
    }

    @RequestMapping(value = { "/fixing/{id}"}, method = RequestMethod.GET)
    public @ResponseBody Optional<Fixing> getFixingsByID(@PathVariable("id") int id){
        return fixingRepository.findById(id);
    }

    @RequestMapping(value = { "/deleteFixing/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteFixingByID(@PathVariable("id") int id){
        fixingRepository.deleteById(id);
    }

    @RequestMapping(value = { "/putFixing"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void putDiscipline(@RequestBody Fixing f){
        fixingRepository.save(f);
    }

}
