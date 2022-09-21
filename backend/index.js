const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Routes
const departamentRouter = require("./routes/departaments.routes");
const subjectsRouter = require("./routes/subjects.routes");
const specialityRouter = require("./routes/speciality.routes");
const groupsRouter = require("./routes/groups.routes");
const studentsRouter = require("./routes/students.routes");
const teachersRouter = require("./routes/teachers.routes");
const journalsRouter = require("./routes/journals.routes");
const classroomsRouter = require("./routes/classrooms.routes");
const plansRouter = require("./routes/plans.routes");
const usersRouter = require("./routes/users.routes");
const studentsGroupsRouter = require("./routes/students_groups.routes");
const subjectsPlansRouter = require("./routes/subjects_plans.routes");
const subjectsTeachersRouter = require("./routes/subjects_teachers.routes");

const authRouter = require("./routes/auth.routes");
const dumpRouter = require("./routes/dump.routes");
const historyRouter = require("./routes/history.routes");
const uptimeRouter = require("./routes/uptime.routes");

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

app.use("/api", departamentRouter);
app.use("/api", subjectsRouter);
app.use("/api", specialityRouter);
app.use("/api", groupsRouter);
app.use("/api", studentsRouter);
app.use("/api", teachersRouter);
app.use("/api", journalsRouter);
app.use("/api", classroomsRouter);
app.use("/api", plansRouter);
app.use("/api", usersRouter);

app.use("/api", studentsGroupsRouter);
app.use("/api", subjectsPlansRouter);
app.use("/api", subjectsTeachersRouter);

app.use("/api", authRouter);
app.use("/api", dumpRouter);
app.use("/api", historyRouter);
app.use("/uptime", uptimeRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
