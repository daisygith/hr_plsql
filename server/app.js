const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const auth = require("./users/auth");
const departments = require("./departments/departments");
const employees = require("./employees/employees");
const profiles = require("./profiles/profiles");

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

//employees
app.get("/api/employees", employees.list);

app.get("/api/employees/:id", employees.getById);

app.post("/api/employees", employees.add);

app.put("/api/employees/:id", employees.update);

app.delete("/api/employees/:id", employees.delete);

//profiles
app.get("/api/profiles", profiles.list);

app.get("/api/profiles/:id", profiles.getById);

app.post("/api/profiles", profiles.add);

app.put("/api/profiles/:id", profiles.update);

app.delete("/api/profiles/:id", profiles.delete);

app.use(error);

app.listen(port, () => {
  console.log(`HR_PLSQL APP Server listening  on port ${port}`);
});
