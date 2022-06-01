AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

X GIVEN a command-line application that accepts user input

X WHEN I start the application
X THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

X WHEN I choose to view all departments
X THEN I am presented with a formatted table showing department names and department ids

X WHEN I choose to view all roles
X THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

X WHEN I choose to view all employees
X THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

X WHEN I choose to add a department
X THEN I am prompted to enter the name of the department and that department is added to the database

XWHEN I choose to add a role
X THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

X WHEN I choose to add an employee
X THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database


X WHEN I choose to update an employee role
X THEN I am prompted to select an employee to update and their new role and this information is updated in the database