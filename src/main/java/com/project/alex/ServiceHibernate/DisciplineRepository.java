package com.project.alex.ServiceHibernate;

import com.project.alex.ServiceDiscipline.Discipline;
import org.springframework.data.repository.CrudRepository;

public interface DisciplineRepository extends CrudRepository<Discipline, Integer> {

}
