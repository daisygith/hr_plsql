const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const expressJwt = require("express-jwt");
const auth = require("./auth/auth");
const users = require("./users/users");
const departments = require("./departments/departments");
const request = require("./request-time-off/request-time-off");
const employees = require("./employees/employees");
const profiles = require("./profiles/profiles");
const projects = require("./projects/projects");
const tasks = require("./tasks/tasks");
const roles = require("./roles/roles");
const images = require("./images");
const { secret } = require("./auth/config");

const app = express();
const port = 3000;

function error(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.status(500);
  res.send("Internal Server Error");
}
// Middleware to protect routes using JWT
const jwtMiddleware = expressJwt.expressjwt({ secret, algorithms: ["HS256"] });

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

app.post(
  "/api/uploads/images",
  jwtMiddleware,
  upload.single("file"),
  images.upload,
);

app.get("/api/uploads/images/:filename", jwtMiddleware, images.getImage);

//auth
// app.get("/api/auth", auth.listAuth);

app.post("/api/auth/signin", auth.login);

app.post("/api/auth/signup", auth.addAuth);

// app.put("/api/auth/:id", auth.updateAuth);
//
// app.delete("/api/auth/:id", auth.deleteAuth);

//departments
app.get("/api/departments", jwtMiddleware, departments.list);

app.get("/api/departments/:id", jwtMiddleware, departments.getById);

app.post("/api/departments", jwtMiddleware, departments.add);

app.put("/api/departments/:id", jwtMiddleware, departments.update);

app.delete("/api/departments/:id", jwtMiddleware, departments.delete);

//request-time-off
app.get("/api/employees/request-time-off", jwtMiddleware, request.list);

app.post("/api/employees/request-time-off", jwtMiddleware, request.add);

app.get(
  "/api/employees/request-time-off/:employeeId",
  jwtMiddleware,
  request.getById,
);

app.put("/api/employees/request-time-off/:id", jwtMiddleware, request.update);

app.delete(
  "/api/employees/request-time-off/:id",
  jwtMiddleware,
  request.delete,
);

app.put(
  "/api/employees/request-time-off/:id/approve",
  jwtMiddleware,
  request.statusApprove,
);
app.put(
  "/api/employees/request-time-off/:id/reject",
  jwtMiddleware,
  request.statusReject,
);
app.put(
  "/api/employees/request-time-off/:id/pending",
  jwtMiddleware,
  request.statusPending,
);

//employees
app.get("/api/employees", jwtMiddleware, employees.list);

app.get("/api/employees/:id", jwtMiddleware, employees.getById);

app.post("/api/employees", jwtMiddleware, employees.add);

app.put("/api/employees/:id", jwtMiddleware, employees.update);

app.delete("/api/employees/:id", jwtMiddleware, employees.delete);

//image for employee
app.put(
  "/api/employees/:employeeId/image",
  jwtMiddleware,
  employees.updateImage,
);

app.delete(
  "/api/employees/:employeeId/image",
  jwtMiddleware,
  employees.deleteImage,
);

//profiles
// app.get("/api/profiles", profiles.list);

app.get("/api/profiles/current", jwtMiddleware, profiles.getById);

// app.post("/api/profiles", profiles.add);

app.put("/api/profiles/edit", jwtMiddleware, profiles.update);

// app.put("/api/profiles/image", profiles.updateImage);

app.delete("/api/profiles/image", jwtMiddleware, profiles.delete);

//projects
app.get("/api/projects", jwtMiddleware, projects.list);

app.get("/api/projects/:id", jwtMiddleware, projects.getById);

app.post("/api/projects", jwtMiddleware, projects.add);

app.put("/api/projects/:id", jwtMiddleware, projects.update);

app.delete("/api/projects/:id", jwtMiddleware, projects.delete);

//employees for projectId
app.get(
  "/api/projects/:projectId/employees",
  jwtMiddleware,
  projects.getEmployees,
);

app.post(
  "/api/projects/:projectId/employees",
  jwtMiddleware,
  projects.addEmployee,
);

app.put(
  "/api/projects/:projectId/employees/:employeeId",
  jwtMiddleware,
  projects.updateEmployee,
);
app.delete(
  "/api/projects/:projectId/employees/:employeeId",
  jwtMiddleware,
  projects.deleteEmployee,
);

//tasks
app.get("/api/projects/:projectId/tasks", jwtMiddleware, tasks.list);

app.get("/api/projects/:projectId/tasks/:taskId", jwtMiddleware, tasks.getById);

app.post("/api/projects/:projectId/tasks", jwtMiddleware, tasks.add);

app.put("/api/projects/:projectId/tasks/:taskId", jwtMiddleware, tasks.update);

app.delete(
  "/api/projects/:projectId/tasks/:taskId",
  jwtMiddleware,
  tasks.delete,
);

//roles
app.get("/api/roles", jwtMiddleware, roles.list);

app.get("/api/roles/:id", jwtMiddleware, roles.getById);

app.post("/api/roles", jwtMiddleware, roles.add);

app.put("/api/roles/:id", jwtMiddleware, roles.update);

app.delete("/api/roles/:id", jwtMiddleware, roles.delete);

//users
app.get("/api/users", jwtMiddleware, users.list);

app.get("/api/users/:id", jwtMiddleware, users.getById);

app.post("/api/users", jwtMiddleware, users.add);

app.put("/api/users/:id", jwtMiddleware, users.update);

app.delete("/api/users/:id", jwtMiddleware, users.delete);

app.use(error);

app.listen(port, () => {
  console.log(`HR_PLSQL APP Server listening  on port ${port}`);
});
