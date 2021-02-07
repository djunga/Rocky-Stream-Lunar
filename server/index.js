const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'lunar'
})

// Verify if login info exists and is correct
app.post("/verifyLogin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;

    if(isAdmin) {
        var sql = "SELECT * FROM admins WHERE email = ? AND id = ?";
        db.query(
            sql,
            [email, password],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("login query: ", result);
                if(result.length > 0 ) {
                  res.send(
                    {
                      email: email,
                      id: password,
                      isLoggedIn: true,
                    }
                  );
                }
                else {
                  console.log("Wrong credentials, or this admin does not exist.");
                  res.send({
                    isLoggedIn: false,
                  });
                }

              }
            }
        );
    }
    else {
        console.log("Student is logging in.");
    }
  });

  app.post("/newstudent", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const major = req.body.major;
    const gpa = req.body.gpa;
    const email = req.body.email;
  
    db.query(
      "INSERT INTO students (firstName, lastName, dob, major, gpa, email) VALUES (?,?,?,?,?,?)",
      [firstName, lastName, dob, major, gpa, email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

app.listen(3001, ()=> {
    console.log("The Lunar server is running...");
});