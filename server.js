const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: "bzduxh4ybls09iyrxxcc-mysql.services.clever-cloud.com",
    user: "ugaqhagxn39xwrv0",
    password: "QObw9XhOQu5RRUlm8y2e",
    database: "bzduxh4ybls09iyrxxcc"
  });

// signup
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`fname`, `lname`, `email`, `number`, `password`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.fname,
      req.body.lname,
      req.body.email,
      req.body.number,
      req.body.password
    ];
    db.query(sql, values, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  //seller form
app.post('/sellerform',(req,res)=>{
  const sql="INSERT INTO site (`place`,`area`,`image`,`no_of_bedrooms`,`no_of_bathrooms`) VALUES(?)";
  const values=[
    req.body.place,
    req.body.area,
    req.body.image,
    req.body.no_of_bedrooms,
    req.body.no_of_bathrooms,
  ] ;
  console.log("All okay")
  db.query(sql,[values],(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  });
});


//buyerdash
app.get('/all-sites',(req,res)=>{
  const sql="SELECT * FROM site";
  const values=[
   
    req.body.place,
    req.body.area,
    req.body.image,
    req.body.no_of_bedrooms,
    req.body.no_of_bathrooms,
    
  ] ;
  db.query(sql,[values],(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  });
});
  


//login
  app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [req.body.email, req.body.password];
    db.query(sql, values, (err, results) => {
      if (err) {
        return res.json(err);
      }
      if (results.length > 0) {
        return res.json({ message: 'Login successful', redirect: '/who_are_you' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });


  //profile icon
  app.post('/userdetails', (req, res) => {
    console.log("Request received at /userdetails endpoint");  
  
    const { email } = req.body; 
    console.log("Received request for user details with email:", email);
  
    if (!email) {
      console.log("No email provided");
      return res.status(400).json({ error: 'Username not provided' });
    }
  
    const sql = "SELECT email FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length > 0) {
        const userData = results[0];
        console.log("User found:", userData);
        return res.json(userData);
      } else {
        console.log("User not found");
        return res.status(404).json({ message: 'User not found' });
      }
    });
  });

  app.listen(5000, () => {
    console.log("listening");
  });