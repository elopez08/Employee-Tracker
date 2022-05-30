const express = require('express');
//We have a connection using connection.js.  Has port information and require for mysql2
const db = require('./db/connection');

//Using Port: 3001
//const PORT = process.env.PORT || 3001;
//const app = express();

const path = require("path");

//Default Settings:
const fs = require("fs");
const inquirer = require("inquirer");


db.connect(function (err) {
    //If there are any errors, track this first
    if (err)
    {
        throw err;
    }
    console.log();

    //Loading Screen for Creating an Employee Tracker
    console.log(`
    _____                                  ______                                                           _____          _____                                                                                                           _____                          
    _____\    \        ___________        _____|\     \  _____                   ____     ______   _____    _____\    \    _____\    \          ________    ________ ___________          _____                _____   ______   _______    _____\    \ ___________             
   /    / |    |      /           \      /     / |     ||\    \              ____\_  \__ |\     \ |     |  /    / |    |  /    / |    |        /        \  /        \\          \       /      |_         _____\    \_|\     \  \      \  /    / |    |\          \            
  /    /  /___/|     /    _   _    \    |      |/     /| \\    \            /     /     \\ \     \|     | /    /  /___/| /    /  /___/|       |\         \/         /|\    /\    \     /         \       /     /|     |\\     \  |     /|/    /  /___/| \    /\    \           
 |    |__ |___|/    /    //   \\    \   |      |\____/ |  \\    \          /     /\      |\ \           ||    |__ |___|/|    |__ |___|/       | \            /\____/ | |   \_\    |   |     /\    \     /     / /____/| \|     |/     //|    |__ |___|/  |   \_\    |          
 |       \         /    //     \\    \  |\     \    | /    \|    | ______ |     |  |     | \ \____      ||       \      |       \             |  \______/\   \     | | |      ___/    |    |  |    \   |     | |____|/   |     |_____// |       \        |      ___/           
 |     __/ __     /     \\_____//     \ | \     \___|/      |    |/      \|     |  |     |  \|___/     /||     __/ __   |     __/ __           \ |      | \   \____|/  |      \  ____ |     \/      \  |     |  _____    |     |\     \ |     __/ __     |      \  ____        
 |\    \  /  \   /       \ ___ /       \|  \     \          /            ||     | /     /|      /     / ||\    \  /  \  |\    \  /  \           \|______|  \   \      /     /\ \/    \|\      /\     \ |\     \|\    \  /     /|\|     ||\    \  /  \   /     /\ \/    \       
 | \____\/    | /________/|   |\________\\  \_____\        /_____/\_____/||\     \_____/ |     /_____/  /| \____\/    | | \____\/    |                   \  \___\    /_____/ |\______|| \_____\ \_____\| \_____\|    | /_____/ |/_____/|| \____\/    | /_____/ |\______|       
 | |    |____/||        | |   | |        |\ |     |       |      | |    ||| \_____\   | /      |     | / | |    |____/| | |    |____/|                    \ |   |    |     | | |     || |     | |     || |     /____/||     | / |    | || |    |____/| |     | | |     |       
  \|____|   | ||________|/     \|________| \|_____|       |______|/|____|/ \ |    |___|/       |_____|/   \|____|   | |  \|____|   | |                     \|___|    |_____|/ \|_____| \|_____|\|_____| \|_____|    |||_____|/  |____|/  \|____|   | | |_____|/ \|_____|       
        |___|/                                                              \|____|                             |___|/         |___|/                                                                          |____|/                         |___|/                          
                     
    `
    );

    //Have the Prompt Run first!
    firstPrompt();

})

function firstPrompt() {

    inquirer.prompt([{
        type: list,
        message: `What would you like to do? `,
        name: task,
        //THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        choices: [
        `View All Derpartments`, 
        `View All Roles`, 
        `View All Employees`, 
        `Add a Department`, 
        `Add a Role`, 
        `Add an Employee`, 
        `Update an Employee Role`
        ]

        //Where would all the functions go?
    }]).then(function (userInput) {
        switch(userInput.task) {
            case `View All Derpartments`:
                viewDepartment();
                break;
            case `View All Roles`:
                viewRoles();
                break;
            case `View All Employees`:
                viewEmployees();
                break;
            case `Add a Department`:
                addDepartment();
                break;
            case `Add a Role`:
                addRole();
                break;
            case `Add an Employee`:
                addEmployee();
                break;
            case `Update an Employee Role`:
                updateEmployeeRole();
                break;
        }
    })

}

//View Department Function
function viewDepartment() {
    
    console.log(`Initializing Viewing All Departments... \n`),
    console.log(`Viewing Department Names & Department IDs... \n`),
    //THEN I am presented with a formatted table showing 1) department names and 2) department ids
    //NEEDS TO BE EDITED
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
        function(err,res) {
            if (err)
            {
                throw err;
            }
            //Starting of the list of the Department

            console.log(``)
            console.log(`***Department List***`)
            console.log(``)

            //There's a neat trick you can do in displaying the function by applying this method:
            console.table(res)
            //It'll show the ID first, and then it'll show the Department next.  It'll be separated like a table in the data

            //Go back to start to select a new option
            firstPrompt();
        })



}

//View Roles Function
function viewRoles() {
    console.log(`Viewing Roles... \n`),
    console.log(`Viewing the Job Title, Role ID, Department that it belongs, and Salary for the Role`),
    //THEN I am presented with the 1) job title, 2) role id, 3) the department that role belongs to, and 4) the salary for that role

    //THIS NEEDS MODIFYING
    connection.query("SELECT role.title AS Job Title, role.name AS Department FROM department, salary ",
    //END OF MODIFICATION
    function(err,res) {
        if (err)
        {
            throw err;
        }
        console.log(``)
        console.log(`***Department List***`)
        console.log(``)
        console.table(res)
        //Needs to display:  Job Title, Role ID, Department, and Salary

        firstPrompt();
    })


}

//View Employees Function
function viewEmployees() {
    console.log(`Viewing Employees... \n`);
    //THEN I am presented with a formatted table showing 1) employee data, including 2) employee ids, 3) first names, 4) last names, 5) job titles, 6) departments, 7) salaries, and 8) managers that the employees report to
        //THIS NEEDS MODIFYING
        let query = "SELECT *FROM employee ";
        db.query(query, function(err,res) {
            if (err)
            {
                throw err;
            }
            //Start out an empty array
            let employeeArray = [];
            console.log(``)
            console.log(`***Employees List***`)
            console.log(``)
            res.forEach(employee => employeeArray.push(employee));
            //This is what's causing it to be read:
            console.table(res)
            //Needs to display:  Employee ID, First Name, Last Name, Job Titles, Departments, Salaries, and Managers
    
            firstPrompt();
        })    

}



//Add Department function
function addDepartment() {
    console.log(`Adding Department Section. \n`);
    //THEN I am prompted to enter the name of the department and that department is added to the database
    inquirer.prompt([
        {
            name: firstname,
            type: input,
            message: `What's the first name of the department?`,
            validate: departnameinput => {
                if(departnameinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need a name of the department you want to add!`);
                    return false;
                }
            }
        }
        //Gathers the information from the department and then adds it to the list
    ]).then(answersdepartment => {
        //What do we need to do to add this to the database
    })


}


//Add Role function
function addRole() {
    console.log(`Add Role Section. \n`);
    //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    inquirer.prompt([
        {
            name: firstname,
            type: input,
            message: `What's the first name of the Employee?`,
            validate: firstnameinput => {
                if(firstnameinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need a first name of the employee!`);
                    return false;
                }
            }
        },
        {
            name: lastname,
            type: input,
            message: `What's the salary the Employee?`,
            validate: lastnameinput => {
                if(lastnameinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Can't leave this empty.  Need a salary!`);
                    return false;
                }
            }
        },
        {
            name: roleinput,
            type: input,
            message: `What's their department?`,
            validate: roleinput => {
                if(roleinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need to have a department!`);
                    return false;
                }
            }
        }
    ]).then(function (answerrole) {

        //Add the information from the given function to the database
    })


}


//Add Employee function
function addEmployee() {
    console.log(`Please add an Employee. \n`);
    //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

    inquirer.prompt([
        {
            name: firstname,
            type: input,
            message: `What's the first name of the Employee?`,
            validate: firstnameinput => {
                if(firstnameinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need a first name of the employee!`);
                    return false;
                }
            }
        },
        {
            name: lastname,
            type: input,
            message: `What's the last name of the Employee?`,
            validate: lastnameinput => {
                if(lastnameinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need a last name of the employee!`);
                    return false;
                }
            }
        },
        {
            name: roleinput,
            type: input,
            message: `What's the role of the Employee?`,
            validate: roleinput => {
                if(roleinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need to have a role of the employee!`);
                    return false;
                }
            }
        },
        {
            name: managername,
            type: input,
            message: `What's the role of the Employee?`,
            validate: managernameinput => {
                if(managernameinput)
                {
                    return true;
                }
                else
                {
                    console.log(`Need to have a manager for the employee!`);
                    return false;
                }
            }
        }
    ]).then(function (answeremployee) {
        //Add to database from given information
    })

}


//Update Employee Role Function
function updateEmployeeRole() {
    console.log(`Update Employee Role Section \n`);
    //THEN I am prompted to select an employee to update and their new role and this information is updated in the database
}