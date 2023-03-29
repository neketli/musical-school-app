const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Routes
const routes = {
  departamentRouter: require("../routes/departaments.routes"),
  specialityRouter: require("../routes/speciality.routes"),
  groupsRouter: require("../routes/groups.routes"),
  studentsRouter: require("../routes/students.routes"),
  teachersRouter: require("../routes/teachers.routes"),
  journalsRouter: require("../routes/journals.routes"),
  usersRouter: require("../routes/users.routes"),
  studentsGroupsRouter: require("../routes/students_groups.routes"),
  subjectsRouter: require("../routes/subjects.routes"),
  subjectsTeachersRouter: require("../routes/subjects_teachers.routes"),
  authRouter: require("../routes/auth.routes"),
  dumpRouter: require("../routes/dump.routes"),
  historyRouter: require("../routes/history.routes"),
};

const uptimeRouter = require("../routes/uptime.routes");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);
app.use(fileUpload({}));

for (const route in routes) {
  if (Object.hasOwnProperty.call(routes, route)) {
    app.use("/api", routes[route]);
  }
}

app.use("/uptime", uptimeRouter);

export default app;
