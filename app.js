const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/error");

// const User = require("./models/user");

// const mongoConnect = require("./util/database").mongoConnect;
const { mongoose, main } = require('./util/database')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findById("667d02e83480557b1263cbbf")
  //   .then((user) => {
  //     req.user = new User(user.name, user.email, user.cart, user._id);
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next()
});

app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController.get404);

// const user = new User("roger", "roger@test.com", { items: [] });
// user.save();
// mongoose
//   // .connect('mongodb+srv://rain77:pyTau8nOTHya4u2E@cluster0.km8ou3n.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
//   .connect('mongodb://127.0.0.1:27017/nodejsdb')
//   .then(result => {
//     app.listen(3000);
//   })

main().catch(error => console.log(error))

app.listen(3000)
// const app = require("express")
// const mongoose = require("./util/database")

// // mongoose
// //   // .connect('mongodb+srv://rain77:pyTau8nOTHya4u2E@cluster0.km8ou3n.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
// //   .connect('mongodb://127.0.0.1:27017/nodejsdb')
// //   .then(result => {
// //     app.listen(3000);
// //   })

// app.listen(3000)