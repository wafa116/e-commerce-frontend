const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { db } = require('./db/database');
const { User } = require('./db/users');
const { Credentials } = require('./db/credentials');

let direname = __dirname.replace('backend', '');

const API_PATH = '/api/v1';

app.use(express.static(direname + "/dist/e-commerce-frontend/browser"));

app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:4200', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.get("/", function(req, res) {
  res.sendFile(path.join(direname + "/dist/e-commerce-frontend/browser/index.html"));
});

db.sync({ force: true }).then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT || 3000);
  console.log("App is listenning!");
});

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'example_jwt_secret_key';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid Token' });
  }
}

app.post(API_PATH + '/auth/register', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if(password !== confirmPassword){
      res.status(400).json({ message: 'Passwords don\'t match!' });
    } else {
      await Credentials.create({ email, password, status: 'INACTIVE' });
      res.status(201).json({email});
    }
    
  } catch (error) {
    res.status(400).json({ message: error.message + '. It seems that this email is already used!' });
  }
});

app.post(API_PATH + '/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const credentials = await Credentials.findOne({ where: { email } });

    if (!credentials || !(await bcrypt.compare(password, credentials.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: credentials.id, username: credentials.email }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post(API_PATH + '/auth/logout', authenticateToken, (req, res) => {
  const token = req.header('Authorization').split(' ')[1];
  
  // Add token to blacklist
  tokenBlacklist.push(token);
  
  res.json({ message: 'Logged out successfully' });
});

/*app.get(API_PATH + '/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});*/

app.get(API_PATH + '/users/:email', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.params.email);
  res.json(user);
});

app.post(API_PATH + '/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

