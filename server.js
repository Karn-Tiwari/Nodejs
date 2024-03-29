// function add(a, b) {
//   return a + b;
// }

// var add = function(a,b){
//     return a + b;
// }

// var add = (a,b)=>{
//     return a + b;
// }

// var add = (a, b) => a + b;
// var sum = add(2, 2);
// console.log(sum);
// (function () {
//   console.log("Hello World");
// })();

// callback function These are the functions which are passed as an argument to another function

// function callback() {
//   console.log("It is called after execution of main function");
// }

// function mainFunction(a, b, callback) {
//   console.log(a + b);
//   callback();
// }

// mainFunction(2, 3, callback);

// mainFunction(2, 3, function () {
//   console.log("It is called after execution of main function");
// });
// mainFunction(2, 3, () => {
//   console.log("It is called after execution of main function");
// });

// var os = require("os");
// var fs = require("fs");

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile("greetings.txt", `Hello + ${user.username}` + `!\n`, (err) => {
//   if (err) {
//     console.log("Unable to write to file");
//   } else {
//     console.log("file is created   ");
//   }
// });

// const notes = require("./notes.js");
// lodash ka naam kuch bhi rakh sakte ahi ye to bass usi tarah hai jaise hum log let x likhte hai iska naam change kar sakte hai koi dikkat nhi hai
// Lodash ek simple package jo lots of function provide karta hai jisse hum server side pe har ek cheez k liye logic aur code likhne se bach sakte hai iska inbuilt function use karke

// var _ = require("lodash");

// console.log("Server file is available");

// var ageOfPerson = notes.age;
// console.log("The age of a person is :", ageOfPerson);

// var sum = notes.addNumber(ageOfPerson + 18, 12);
// console.log("Now the total sum of the number is: ", sum);

// var arrData = ["person", "person", 1, 2, 3, 4, 2, 1, "name", "age", 2];

// // Calculate the unique element in an array or we can say the remove the duplicate data

// var uniqueData = _.uniq(arrData);
// console.log(uniqueData);

// console.log(_.isString(arrData[4]));
// console.log(_.isString("karn Tiwari"));

//Conversion of jsonString to jsonObject

// const jsonString = `{ "name": "karn", "age": 22 , "city": "Delhi" }`;

// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);

//Conversion of jsonObject to jsonString
// const jsonObject = {
//   name: "karn Tiwari",
//   age: 22,
//   city: "Gurgaon",
//   state: "Haryana",
// };

// const jsonString = JSON.stringify(jsonObject);
// console.log(jsonString);

const express = require("express");
const app = express();
const db = require("./db.js");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Person = require("./models/Person.js");
const PORT = process.env.PORT || 8000;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//Middleware Funtion
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next(); //Move to the next middleware function or Next phase
};

app.use(logRequest); // humse sare logging routes pe laga diya iss syntax se

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      // console.log("Recieved credentials", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(passport.initialize());

app.get(
  "/",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    res.send("Welcome to Hotel Management System");
  }
);

const MenuItem = require("./models/MenuItem.js");
app.get("/menuItem", (req, res) => {
  res.send("This is a get request for the menu");
});

const menuRoutes = require("./routes/menuRoutes.js");
app.use("/menu", menuRoutes);

// Import the routes files
const personRoutes = require("./routes/personRoutes.js");
app.use("/person", personRoutes);

app.listen(PORT, "localhost", () => {
  console.log("Server is running on port 8000");
});
