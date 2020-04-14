package com.project.alex.ServiceHibernate;

import com.project.alex.ServiceAdmin.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Integer> {

}
