const express = require("express");
// const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const auth = require("./auth");
const departments = require("./departments");

//auth
app.get("/api/auth", auth.list);

app.post("/api/auth/signin", auth.add);

app.post("/api/auth/signup", auth.list);

app.put("/api/auth/:id", auth.update);

app.delete("/api/auth/:id", auth.delete);

//departments
app.get("/api/departments", departments.list);

app.post("/api/departments", departments.add);

app.post("/api/departments", departments.list);

app.put("/api/departments/:id", departments.update);

app.delete("/api/departments/:id", departments.delete);

app.use(error);

app.listen(port, () => {
  console.log(`TODO APP Server listening  on port ${port}`);
});
