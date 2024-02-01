// //Two types of module
// //1.File based module:-> Isme ek file export karke dusre jagah import karke use karte hai
// //2. BUild in: Jisko download nhi karna padta hai example HTTP,paths,OS,fs etc
// //3. Third party module:-> Isme hume download karna padta hai example express,socket.io etc

// // const fs = require("fs");

// // fs.readFile("./sample.txt", "utf-8", (err, data) => {
// //     if(err){
// //         throw err;
// //     }
// //     console.log(data);
// // }
// // );

// // I am first pehle print hoga then file ka data print hoga because file read karne me time lagta hai aur asynchread hai
// // console.log("I am first");

// import http from "http";
// import gfName from "./features.js";

// console.log(gfName);
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     return res.end("<h1>Home Page</h1>");
//   }
//   if (req.url === "/about") {
//     return res.end("<h1>About Page</h1>");
//   }
//   if (req.url === "/contact") {
//     return res.end("<h1>Contact Page</h1>");
//   }
//   if (req.url === "/services") {
//     return res.end("<h1>Services Page</h1>");
//   } else {
//     return res.end("<h1>404 Page not found</h1>");
//   }
// });

// server.listen(4000, "localhost", () => {
//   console.log("Server is running on port 4000");
// });

const prompt = require("prompt-sync")();
const age = prompt("Please enter your age:");
if (age < 18) {
  console.log("You are not eligible to vote");
} else {
  console.log("You are eligible to vote");
}
