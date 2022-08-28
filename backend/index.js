const express = require("express");
const departamentRouter = require("./routes/departaments.routes");
const specialityRouter = require("./routes/speciality.routes");
const groupsRouter = require("./routes/groups.routes");
const studentsRouter = require("./routes/students.routes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use("/api", departamentRouter);
app.use("/api", specialityRouter);
app.use("/api", groupsRouter);
app.use("/api", studentsRouter);

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
