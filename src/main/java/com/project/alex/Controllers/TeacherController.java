package com.project.alex.Controllers;

import com.project.alex.ServiceAdmin.Admin;
import com.project.alex.ServiceDiscipline.Discipline;
import com.project.alex.ServiceFixing.Fixing;
import com.project.alex.ServiceHibernate.AdminRepository;
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

    @Autowired
    private AdminRepository adminRepository;

    @RequestMapping(value = { "/createTeacher"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createTeacher(@RequestBody Teacher t){
        teacherRepository.save(t);
    }

    @RequestMapping(value = { "/teachers"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Teacher> getAllTeachers(){
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
    public @ResponseBody Iterable<Discipline> getAllDisciplines(){
        return disciplineRepository.findAll();
    }

    @RequestMapping(value = { "/discipline/{id}"}, method = RequestMethod.GET)
    public @ResponseBody Optional<Discipline> getDisciplineByID(@PathVariable("id") int id){
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
        fixingRepository.save(f);
    }

    @RequestMapping(value = { "/fixings"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Fixing> getAllFixings(){
        return fixingRepository.findAll();
    }

    @RequestMapping(value = { "/fixing/{id}"}, method = RequestMethod.GET)
    public @ResponseBody Optional<Fixing> getFixingByID(@PathVariable("id") int id){
        return fixingRepository.findById(id);
    }

    @RequestMapping(value = { "/deleteFixing/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteFixingByID(@PathVariable("id") int id){
        fixingRepository.deleteById(id);
    }

    @RequestMapping(value = { "/putFixing"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void putFixing(@RequestBody Fixing f){
        fixingRepository.save(f);
    }




    @RequestMapping(value = {"/createAdmin"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createAdmin(@RequestBody Admin a){
        adminRepository.save(a);
    }

    @RequestMapping(value = { "/admins"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }

    @RequestMapping(value = { "/admin/{id}"}, method = RequestMethod.GET)
    public @ResponseBody Optional<Admin> getAdminByID(@PathVariable("id") int id){
        return adminRepository.findById(id);
    }

    @RequestMapping(value = { "/deleteAdmin/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteAdminByID(@PathVariable("id") int id){
        adminRepository.deleteById(id);
    }

    @RequestMapping(value = { "/putAdmin"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void putAdmin(@RequestBody Admin a){
        adminRepository.save(a);
    }
}
