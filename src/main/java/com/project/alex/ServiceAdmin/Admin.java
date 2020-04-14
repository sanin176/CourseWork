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
public class Admin {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO, generator = "admins")
    private int id;
    private String name;
    private String login;
    private String password;
}
