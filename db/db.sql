DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

/*THEN I am presented with a formatted table showing 1) department names and 2) department ids*/

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

/*THEN I am presented with the 1) job title, 2) role id, 3) the department that role belongs to, and 4) the salary for that role*/


CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL(10, 0) NOT NULL,
    PRIMARY KEY (id)
);

/*THEN I am presented with a formatted table showing 1) employee data, including 2) employee ids, 3) first names, 4) last names, 5) job titles, 6) departments, 7) salaries, and 8) managers that the employees report to
*/

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);