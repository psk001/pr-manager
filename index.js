require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8008;

app.use(cors());
app.use(bodyParser.json());

const connectToDatabase = require("./db");

const roleRoute = require("./routes/Role");
const userRoute = require("./routes/User");
const pullRequestRoute = require("./routes/PullRequest");


app.use('/pull-requests', pullRequestRoute)
app.use("/roles", roleRoute);
app.use("/users", userRoute);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`server running on PORT ${PORT}`);
});
