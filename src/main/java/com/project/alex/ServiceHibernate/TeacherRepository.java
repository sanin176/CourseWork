package com.project.alex.ServiceHibernate;

import com.project.alex.ServiceTeacher.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Integer> {

}
