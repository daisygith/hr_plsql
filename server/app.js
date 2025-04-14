const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const auth = require("./users/auth");
const departments = require("./departments/departments");
const request = require("./request-time-off/request-time-off");
const employees = require("./employees/employees");
const profiles = require("./profiles/profiles");
const projects = require("./projects/projects");
const tasks = require("./tasks/tasks");
const roles = require("./roles/roles");

function error(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.status(500);
  res.send("Internal Server Error");
}
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//auth
app.get("/api/auth", auth.list);

app.post("/api/auth/signin", auth.add);

app.post("/api/auth/signup", auth.list);

app.put("/api/auth/:id", auth.update);

app.delete("/api/auth/:id", auth.delete);

//departments
app.get("/api/departments", departments.list);

app.get("/api/departments/:id", departments.getById);

app.post("/api/departments", departments.add);

app.put("/api/departments/:id", departments.update);

app.delete("/api/departments/:id", departments.delete);

//request-time-off
app.get("/api/employees/request-time-off", request.list);

app.post("/api/employees/request-time-off", request.add);

app.get("/api/employees/request-time-off/:employeeId", request.getById);

app.put("/api/employees/request-time-off/:id", request.update);

app.delete("/api/employees/request-time-off/:id", request.delete);

app.put("/api/employees/request-time-off/:id/approve", request.statusApprove);
app.put("/api/employees/request-time-off/:id/reject", request.statusReject);
app.put("/api/employees/request-time-off/:id/pending", request.statusPending);

//employees
app.get("/api/employees", employees.list);

app.get("/api/employees/:id", employees.getById);

app.post("/api/employees", employees.add);

app.put("/api/employees/:id", employees.update);

app.delete("/api/employees/:id", employees.delete);

//image for employee
app.put("/api/employees/:employeeId/image", employees.updateImage);

app.delete("/api/employees/:employeeId/image", employees.deleteImage);

//profiles
app.get("/api/profiles", profiles.list);

app.get("/api/profiles/:id", profiles.getById);

app.post("/api/profiles", profiles.add);

app.put("/api/profiles/:id", profiles.update);

app.delete("/api/profiles/:id", profiles.delete);

//projects
app.get("/api/projects", projects.list);

app.get("/api/projects/:id", projects.getById);

app.post("/api/projects", projects.add);

app.put("/api/projects/:id", projects.update);

app.delete("/api/projects/:id", projects.delete);

//employees for projectId
app.get("/api/projects/:projectId/employees", projects.getEmployees);

app.post("/api/projects/:projectId/employees", projects.addEmployee);

app.put(
  "/api/projects/:projectId/employees/:employeeId",
  projects.updateEmployee,
);
app.delete(
  "/api/projects/:projectId/employees/:employeeId",
  projects.deleteEmployee,
);

//tasks
app.get("/api/projects/:projectId/tasks", tasks.list);

app.get("/api/projects/:projectId/tasks/:taskId", tasks.getById);

app.post("/api/projects/:projectId/tasks", tasks.add);

app.put("/api/projects/:projectId/tasks/:taskId", tasks.update);

app.delete("/api/projects/:projectId/tasks/:taskId", tasks.delete);

//roles
app.get("/api/roles", roles.list);

app.get("/api/roles/:id", roles.getById);

app.post("/api/roles", roles.add);

app.put("/api/roles/:id", roles.update);

app.delete("/api/roles/:id", roles.delete);

app.use(error);

app.listen(port, () => {
  console.log(`HR_PLSQL APP Server listening  on port ${port}`);
});
