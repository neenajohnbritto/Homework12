CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
    name varchar(30),
	PRIMARY KEY (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary decimal(8,2),
    department_id int(10),
	PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
	role_id int(10),
    manager_id int(10),
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

select emp.first_name, emp.last_name, rol.title, rol.salary, dep.name
from employee emp join role rol  on emp.role_id = rol.id join department dep dep.id = rol.department_id
;

insert into department (name) values ("IT");
insert into department (name) values ("Accounts");
insert into department (name) values ("Admin");

insert into role (title,salary,department_id) values ("Manager",100000.00,1);
insert into role (title,salary,department_id) values ("Developer",90000.00,1);
insert into role (title,salary,department_id) values ("Analyst",70000.00,2);
insert into role (title,salary,department_id) values ("Admin",80000.00,3);

insert into employee (first_name, last_name, role_id, manager_id) values ("Neena","John",2,2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Kiran","Alam",2,2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Warren","Berra",1,null);
insert into employee (first_name, last_name, role_id, manager_id) values ("Alan","Dizol",2,2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Steve","Baker",1,null);
insert into employee (first_name, last_name, role_id, manager_id) values ("Nadhiya","Katta",3,6);
insert into employee (first_name, last_name, role_id, manager_id) values ("Terrance","Hill",1,null);
insert into employee (first_name, last_name, role_id, manager_id) values ("Shawn","Ahmed",4,8);





