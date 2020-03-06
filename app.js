//Node Modules
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv/config");

//API Modules
const usersAPIRoutes = require("./routes/users")
require("./API/usersAPI")(passport);

//app.js Initialize
const app = express();
const port = 3000;
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>{
  if(err){console.log(err)}
  else{console.log("Conected to DB")}
});

//Middleware
app.use(express.urlencoded({ extended: true }));//Parser
app.use(express.json());//Parser
app.use(cors());//Handles connections from outside
app.use(passport.initialize());//Authentication
app.use(passport.session());//Session

//API Route
app.use("/API/users", usersAPIRoutes);

//Index Page
app.use(express.static(path.join(__dirname, 'public' )))

//App Start
app.listen(port, () => {
    console.log("Server listening on port "+ port);
    }
);

