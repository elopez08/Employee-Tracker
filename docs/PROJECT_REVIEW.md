# Employee Tracker — Project Review & Reconstruction Guide

**Repository:** https://github.com/elopez08/Employee-Tracker  
**Historical project:** UCLA Coding Bootcamp, May 2022  
**GitHub commit window:** May 30–31, 2022 (Pacific Daylight Time); latest commit May 31 at 6:29 PM PDT (June 1 UTC)  
**Review:** October 27, 2026  
**Verification:** Static source-code review only. No local installation, MySQL execution, or runtime testing has been performed.

## 1. Purpose and original requirements

A Node.js command-line employee management application for a business owner to view and manage departments, job roles, and employees. The [README](../README.md) lists seven menu actions:

1. View all departments
2. View all roles
3. View all employees
4. Add a department
5. Add a role
6. Add an employee
7. Update an employee role

The README is largely acceptance criteria; its checked items do not independently establish that all behavior was tested. Actual implementations exist in `index.js`, but some reports are simpler than the requested outputs.

## 2. Technology and concepts inventory

| Technology/concept | Where it appears | Why it matters |
|---|---|---|
| JavaScript / Node.js | `index.js` | Application logic, callbacks, user prompts |
| Inquirer 8 | `package.json`, `index.js` | Interactive command-line menu and validation |
| MySQL | `db/db.sql`, `db/seeds.sql` | Relational database, tables, constraints, test data |
| MySQL2 | `db/connection.js`, `package.json` | Database connection and SQL query execution |
| SQL `SELECT` | `index.js` | Data retrieval |
| SQL `INSERT` | `index.js`, `db/seeds.sql` | Add new records |
| SQL `UPDATE` | `index.js` | Modify existing employee role |
| SQL `CREATE TABLE`, `DROP DATABASE`, `CREATE DATABASE` | `db/db.sql` | Schema setup |
| `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `NOT NULL` | `db/db.sql` | Referential and data integrity |
| `AUTO_INCREMENT`, indexes | `db/db.sql` | Identity columns and indexed references |
| `ON DELETE CASCADE`, `ON DELETE SET NULL` | `db/db.sql` | Referential deletion behavior |
| Array `.map()` | `index.js` | Transform database results into menu choices |
| `console.table()` | `index.js` | Render query results in terminal |

**Not verified in application code:** SQL JOIN statements, a DELETE menu operation, unit tests, or a deployed production service. Database foreign-key `ON DELETE` rules exist, but are not equivalent to implementing a user-facing `DELETE` query.

## 3. Original file map and important lines

| File and lines | Responsibility |
|---|---|
| [`index.js` 1–45](../index.js#L1-L45) | Imports, MySQL connection startup, console banner |
| [`index.js` 48–91](../index.js#L48-L91) | `firstPrompt()`: Inquirer menu and switch dispatch |
| [`index.js` 95–125](../index.js#L95-L125) | `viewDepartment()`: `SELECT` with aliases |
| [`index.js` 129–153](../index.js#L129-L153) | `viewRoles()`: `SELECT * FROM role` |
| [`index.js` 157–181](../index.js#L157-L181) | `viewEmployees()`: `SELECT * FROM employee` |
| [`index.js` 185–231](../index.js#L185-L231) | `addDepartment()`: validation and `INSERT` |
| [`index.js` 235–316](../index.js#L235-L316) | `addRole()`: title, salary, department and `INSERT` |
| [`index.js` 320–416](../index.js#L320-L416) | `addEmployee()`: employee fields and `INSERT` |
| [`index.js` 420–511](../index.js#L420-L511) | `updateEmployeeRole()`: `SELECT`, `.map()`, `UPDATE` |
| [`db/connection.js` 1–16](../db/connection.js#L1-L16) | `mysql2.createConnection()` and database settings |
| [`db/db.sql` 1–38](../db/db.sql#L1-L38) | Create database and three related tables |
| [`db/seeds.sql` 1–33](../db/seeds.sql#L1-L33) | Seed four departments, eight roles, eight employees |
| [`notes/READMENotesValues.md`](../notes/READMENotesValues.md) | Original SQL study notes on data types and constraints |
| [`package.json`](../package.json) | Project dependencies and entrypoint |

## 4. Database relationships

`department(id, name)`
  → one department may have many `role` records

`role(id, title, salary, department_id)`
  → `department_id` references `department.id`
  → one role may have many `employee` records

`employee(id, first_name, last_name, role_id, manager_id)`
  → `role_id` references `role.id`
  → `manager_id` references `employee.id` (self-reference)

Schema specifics:

- IDs: unsigned auto-incrementing integer primary keys.
- Department names and role titles are unique and non-null.
- Salary: unsigned `DECIMAL` (without an explicit scale in the original schema).
- Department and role references use `ON DELETE CASCADE`.
- Manager references use `ON DELETE SET NULL`.
- Indexes appear on the foreign-key columns.

**Caution:** `db/db.sql` begins with `DROP DATABASE IF EXISTS employee_DB;`. Running it will destroy an existing database with that name. Use a disposable local environment and back up anything important first.

## 5. Reproduce the original project: step by step

These instructions reconstruct the original architecture. They are **not a report of a successful test run**.

### Prerequisites

- Node.js with npm
- Local MySQL server, with a user permitted to create a database
- Terminal and code editor
- Optional: MySQL command-line client or MySQL Workbench

### Step A — Clone and install dependencies

```bash
git clone https://github.com/elopez08/Employee-Tracker.git
cd Employee-Tracker
npm install
```

The historical `package.json` includes `inquirer@^8.2.4`, `mysql2@^2.3.3`, and `util@^0.12.4`. No working `start` script is defined. To run the application, use `node index.js`.

**Repository hygiene:** Historical commits included `node_modules`; do not manually edit or treat third-party dependency files as original project code. For a modernized version, exclude `node_modules/` with `.gitignore`.

### Step B — Create schema and seed data

**Warning: this resets `employee_DB`.** Only run on a disposable local database.

```bash
mysql -u YOUR_LOCAL_MYSQL_USER -p < db/db.sql
mysql -u YOUR_LOCAL_MYSQL_USER -p < db/seeds.sql
```

The MySQL CLI will prompt for a password. The seed file expects the schema to have been created first.

To inspect the database:

```sql
USE employee_DB;
SHOW TABLES;
DESCRIBE department;
DESCRIBE role;
DESCRIBE employee;
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
```

Expected seed counts: **4 departments, 8 roles, 8 employees**.

### Step C — Secure database connection before running

The historical `db/connection.js` contains a **hardcoded plaintext database password** committed to Git. Do **not** copy that credential into a new environment or documentation. If it is reused anywhere, rotate it; deleting the current source line does not remove the value from Git history.

A recommended local-only replacement, using environment variables:

```js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'employee_DB'
});

module.exports = db;
```

Set the environment variables in your terminal or use a securely ignored `.env` loader. This replacement is a **recommended improvement**, not the exact historical source. Do not commit real secrets. Confirm that the database user has appropriate local privileges.

### Step D — Start the CLI

```bash
node index.js
```

Expected: `db.connect()` attempts the connection, then prints the ASCII banner and Inquirer menu. If it fails, check MySQL service, port 3306, credentials, and database name.

### Step E — Verify each menu action

1. View departments; expect department IDs and names.
2. View roles; expect raw role rows.
3. View employees; expect raw employee rows.
4. Add a new department; verify with `SELECT * FROM department;`.
5. Add a new role using an existing department ID; verify row.
6. Add an employee using an existing role ID and, if applicable, a valid manager ID.
7. Update the employee's role; verify the `role_id` changed.

Be aware that `console.table(res)` after an `INSERT` or `UPDATE` may display the query result metadata, not the updated table contents. Confirm results using a fresh `SELECT`.

## 6. SQL concepts to study while rebuilding

### Read rows

```sql
SELECT department.id AS ID, department.name AS Department
FROM department;
```

Source: `index.js` line 103. The `AS` keyword gives display-friendly column aliases.

### Insert rows

```sql
INSERT INTO department (name) VALUES ('Research');
```

The original `index.js` line 210 builds this SQL by interpolating prompt input into a string. **For a safer rebuild**, use placeholders:

```js
db.query('INSERT INTO department (name) VALUES (?)', [departmentName], callback);
```

### Update rows

The original `index.js` line 487 updates employee roles by **first name**, which is not guaranteed unique. For a safer rebuild:

```js
db.query(
  'UPDATE employee SET role_id = ? WHERE id = ?',
  [newRoleId, employeeId],
  callback
);
```

This uses a stable employee primary key and parameterized values.

### Join related tables (recommended enhancement, not original implementation)

```sql
SELECT e.id, e.first_name, e.last_name,
       r.title, r.salary, d.name AS department
FROM employee AS e
JOIN role AS r ON e.role_id = r.id
JOIN department AS d ON r.department_id = d.id;
```

This produces the descriptive employee report requested in the README; the current `viewEmployees()` uses `SELECT * FROM employee` instead.

## 7. Known risks and reconstruction opportunities

1. **Credentials:** Hardcoded MySQL password in `db/connection.js`; rotate if reused, use environment variables, and consider Git history remediation.
2. **SQL injection:** `INSERT` and `UPDATE` statements interpolate untrusted prompt values; replace with parameterized queries.
3. **Nonunique employee matching:** `UPDATE ... WHERE first_name = ...` may affect multiple employees; use `employee.id`.
4. **Incomplete relational reporting:** `viewRoles()` and `viewEmployees()` return raw foreign-key IDs, not the joined department/job/manager names described in the README.
5. **Validation:** Prompts mainly reject empty strings; salary and ID values need numeric and referential validation.
6. **Manager optionality:** Schema allows `manager_id` to be `NULL`, but original prompt requires a value; allow top-level employees to have no manager.
7. **Destructive schema reset:** `DROP DATABASE IF EXISTS` deletes existing data.
8. **Schema salary precision:** Original `DECIMAL UNSIGNED` does not explicitly specify precision/scale; consider `DECIMAL(10,2) UNSIGNED` for currency.
9. **Startup:** The project does not define an npm start script.
10. **Repository dependencies:** `node_modules` was included in a historical commit; avoid committing dependencies in future work.
11. **No runtime verification:** All observations are based on source review, not execution.

## 8. Original documentation and attribution

The repository includes a detailed `notes/READMENotesValues.md` covering SQL data types, `CREATE TABLE`, and constraints. It includes generic examples and learning-reference material, not necessarily original code. The README resembles a Bootcamp assignment specification. Commit history shows `elopez08` adding and modifying project files on May 30–31, 2022; compare any assignment starter code before claiming every line was independently authored.

**Conservative resume wording:**

> Employee Tracker — SQL / Node.js (2022). Built and adapted a command-line employee-management project using JavaScript, MySQL2, and SQL to retrieve, insert, and update department, role, and employee records. Worked with relational schemas, primary and foreign keys, seed data, and terminal-based user interactions.

## 9. Reconstruction checklist

- [ ] Install and confirm local Node.js, npm, and MySQL
- [ ] Clone repository and install dependencies
- [ ] Use a disposable database; inspect destructive reset script
- [ ] Create database from `db/db.sql`
- [ ] Load seed records from `db/seeds.sql`
- [ ] Remove/replace hardcoded credentials in local working copy
- [ ] Confirm database connection
- [ ] Run `node index.js`
- [ ] Verify all three SELECT views
- [ ] Verify all three INSERT actions
- [ ] Verify UPDATE action and inspect affected rows
- [ ] Convert SQL strings to parameterized queries
- [ ] Update employee selection to use ID
- [ ] Add JOIN-based reporting
- [ ] Add validation and tests
- [ ] Document screenshots or terminal output from successful local run
- [ ] Compare historical work with Bootcamp starter material

**This file is a study and reconstruction guide, not a claim that the application currently works unmodified.**
