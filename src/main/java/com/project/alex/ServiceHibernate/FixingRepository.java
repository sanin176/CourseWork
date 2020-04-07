package com.project.alex.ServiceHibernate;

import com.project.alex.ServiceDiscipline.Discipline;
import com.project.alex.ServiceFixing.Fixing;
import com.project.alex.ServiceTeacher.Teacher;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface FixingRepository extends CrudRepository<Fixing, Integer> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Fixing f WHERE f.teacher = :id")
    void deleteTeacher(@Param("id") Optional<Teacher> id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Fixing f WHERE f.discipline = :id")
    void deleteDiscipline(@Param("id") Optional<Discipline> id);
}
