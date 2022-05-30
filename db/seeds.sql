/*THEN I am presented with a formatted table showing 1) department names and 2) department ids*/
INSERT INTO department 
    (department_name, department_id)
VALUES 
    ('Software Engineer','1'),
    ('Software Engineer','1'),
    ('Software Engineer','1');


/*THEN I am presented with the 1) job title, 2) role id, 3) the department that role belongs to, and 4) the salary for that role*/

INSERT INTO role 
    (role_title, role_id, department_name, salary)
VALUES 
    ('Programmer', '3', 'Software Engineer', '50000'),
    ('Programmer', '3', 'Software Engineer', '50000'),
    ('Programmer', '3', 'Software Engineer', '50000');


INSERT INTO employee
    (employee_id, first_name, last_name, role_title, department_name, salary, manager_id)
VALUES 
    ('2', 'Adam', 'Joe', 'Software Engineer', '500000', 'Jen'),
    ('2', 'Jack', 'Joe', 'Software Engineer', '500000', 'Jen'),
    ('2', 'Bob', 'Joe', 'Software Engineer', '500000', 'Jen');