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
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const major = req.body.major;
    const gpa = req.body.gpa;
    const email = req.body.email;
  
    db.query(
      "INSERT INTO students (id, firstName, lastName, dob, major, gpa, email) VALUES (?,?,?,?,?,?,?)",
      [id, firstName, lastName, dob, major, gpa, email],
      (err, result) => {
        if(err.errno == 1062) {  // A student with this id or email already exists in the db.
          console.log("Error1062: A student with this id or email already exists in the db.");
          res.send("DUPLICATE_STUDENT");
        }
        else if (err) {
          console.log(err);
        } else {
          res.send({
            id: id,
            result: result,
          });
        }
      }
    );
  });

  app.post("/viewstudent", (req, res) => {
    const id = req.body.id;
  
    db.query(
      "SELECT * FROM students WHERE id = ?",
      [id],
      (err, result) => {
        if(err && err.errno == 1062) {  // A student with this id or email already exists in the db.
          console.log("Error1062: The student with this ID does not exist in the database.");
          res.send("DNE");
        }
        else if (err) {
          console.log(err);
        } else {
          console.log("Success fetching student");
          res.send({
            id: id,
            result: result,
          });
        }
      }
    );
  });

  app.post("/findstudent", (req, res) => {
    const id = req.body.id;
  
    db.query(
      "SELECT * FROM students WHERE id = ?",
      [id],
      (err, result) => {
        if(err && err.errno == 1062) {  // A student with this id or email already exists in the db.
          console.log("Error1062: The student with this ID does not exist in the database.");
          res.send("DNE");
        }
        else if (err) {
          console.log(err);
        } else {
          console.log("Success fetching student");
          res.send({
            id: id,
            result: result,
          });
        }
      }
    );
  });

  app.post("/updatestudent", (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const major = req.body.major;
    const gpa = req.body.gpa;
    const email = req.body.email;
  
    db.query(
      "UPDATE students SET firstName=?, lastName=?, dob=?, major=?, gpa=?, email=? WHERE id=?",
      [firstName, lastName, dob, major, gpa, email, id],
      (err, result) => {
        if(err && err.errno == 1062) {  // A student with this id or email already exists in the db.
          console.log("Error1062: Could not update this student.");
          res.send("UPDATE_ERROR");
        }
        else if (err) {
          console.log(err);
        } else {
          res.send({
            id: id,
            result: result,
          });
        }
      }
    );
  });

  app.post("/viewstudent/:id", (req, res) => {
    const student_id = req.body.student_id;
  
    db.query(
      "SELECT * FROM grades WHERE student_id = ?",
      [student_id],
      (err, result) => {
        if(err && err.errno == 1062) {  // A student with this id or email already exists in the db.
          console.log("Error1062: Getting grades");
          res.send("DNE");
        }
        else if (err) {
          console.log(err);
        } else {
          //console.log("Grade query: ", result);
          res.send({
            result: result,
          });
        }
      }
    );
  });

app.listen(3001, ()=> {
    console.log("The LUNAR server is running...");
});