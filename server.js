const express = require("express");
const StudentRoutes = require("./src/student/routes.js");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello catty");
});
app.use("/api/v1/student", StudentRoutes);

app.listen(port, () => console.log(`app listing at ${port}`));
