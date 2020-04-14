package com.project.alex.ServiceAdmin;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@Component
public class Admins {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "admin")
    private int id;
    private String name;
    private String login;
    private String password;
}
