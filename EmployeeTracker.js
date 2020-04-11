var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jade0319!",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "input",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Add Department"
      ]
    })
    .then(function(answer) {
      switch (answer.input) {
      case "View All Employees":
        employeeSearch();
        break;

      case "View All Employees by Department":
        employeeSearchByDepartment();
        break;

      case "View All Employees by Manager":
        employeeSearchByManager();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Add Department":
        addDepartment();
        break;

      
      }
    });
}

function employeeSearch() {
  var query = "select emp.first_name as FIRST_NAME, emp.last_name as LAST_NAME, rol.title as TITLE, rol.salary as SALARY, dep.name as DEP_NAME, concat(man.first_name , ' ' , man.last_name) as MANAGER " + 
  "from employee emp join role rol  on emp.role_id = rol.id join department dep on  dep.id = rol.department_id " +
  "left join employee man on  emp.manager_id = man.id";
  connection.query(query, function(err, res) {
    console.log("FIRST_NAME   " + "LAST_NAME   " + "TITLE   " + "SALARY   " +  "DEP_NAME   " + "MANAGER   " );
    console.log("*************" + "************" + "********" + "*********" +  "***********" + "**********" );
    //console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].FIRST_NAME + "    " + res[i].LAST_NAME + "    " + res[i].TITLE + "    " + res[i].SALARY + "    " + res[i].DEP_NAME + "    " + res[i].MANAGER + "   " );
    }
    runSearch();
  });
}

function employeeSearchByDepartment() {
  inquirer
  .prompt({
    name: "department",
    type: "rawlist",
    message: "What department do you want to check?",
    choices: [
      "IT",
      "Accounts",
      "Admin"
    ]
  })
  .then(function(answer) {
    console.log(answer.department);
    connection.query("SELECT emp.first_name as FIRST_NAME, emp.last_name as LAST_NAME from employee emp join role rol  on emp.role_id = rol.id join department dep on  dep.id = rol.department_id " +
    "left join employee man on  emp.manager_id = man.id  WHERE ?", { name: answer.department }, function(err, res) {
      console.log("FIRST_NAME   " + "LAST_NAME   " );
      console.log("*************" + "************"  );
      //console.log(res);
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].FIRST_NAME + "  " + res[i].LAST_NAME );
      }
      runSearch();
    });
  });
}

function employeeSearchByManager() {
  var query = "select concat(emp.first_name , ' ' , emp.last_name) as employee, concat(man.first_name , ' ' , man.last_name) as manager  " +
  "from employee emp  join employee man on  emp.manager_id = man.id";
  connection.query(query, function(err, res) {
    console.log("EMPLOYEE NAME       " + "MANAGER NAME       " );
    console.log("*************       " + "************       "  );
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].employee + "           " + res[i].manager + "  " );
    }
    runSearch();
  });
}

function addEmployee() {
  inquirer
  .prompt([{
    name: "first_name",
    type: "input",
    message: "Enter First Name: "
  },
  {
    name: "last_name",
    type: "input",
    message: "Enter Last Name: "
  },
  {
    name: "role_id",
    type: "rawlist",
    message: "Select Role Id: ",
    choices: [
      "1",
      "2",
      "3",
      "4"
    ]
  },
  {
    name: "manager_id",
    type: "rawlist",
    message: "Select Manager Id: ",
    choices: [
     "2",
     "6",
     "8"
    ]
  }]
  )
  .then(function(answer) {
    
    const input = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
    connection.query("insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)", input, function(err, res, fields) {
      console.log('Todo Id:' + res.insertId);
      runSearch();
    });
  });
}

function addDepartment() {
  inquirer
  .prompt({
    name: "department_name",
    type: "input",
    message: "Enter Department Name: "
  }
  )
  .then(function(answer) {
    
    const input = answer.department_name;
    connection.query("insert into department (name) values (?)", input, function(err, res, fields) {
      console.log('Todo Id:' + res.insertId);
      runSearch();
    });
  });
}

