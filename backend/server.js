const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const { sequelize, User } = require('./db');

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

app.listen(process.env.PORT || 3000);

app.get("/", function(req, res) {
  res.sendFile(path.join(direname + "/dist/e-commerce-frontend/browser/index.html"));
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
});

app.use(express.json());

app.get(API_PATH + '/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post(API_PATH + '/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




console.log("App is listenning!");