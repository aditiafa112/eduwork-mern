const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

const DUMMY_USERS = []; // not a database, just some in-memory storage for now

app.use(express.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  next();
});

app.get("/users", (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
});

app.post("/user", (req, res, next) => {
  const { name, age } = req.body;

  if(!name || typeof name !== "string" || name.trim().length === 0){
    return res.status(422).json({
      message: "Invalid name, name must be string and can't be empty.",
    });
  }

  if(!age || typeof age !== "number" || age <= 0){
    return res.status(422).json({
      message: "Invalid age, age must be a number and must be greater than 0.",
    });
  }

  const newUser = {
    id: uuid(),
    name,
    age,
  };

  DUMMY_USERS.push(newUser);

  res
    .status(201)
    .json({ message: "Created new user.", user: newUser });
});

app.delete("/user/:id", (req, res, next) => {
  const userId = req.params.id;

  const userIndex = DUMMY_USERS.findIndex((user) => user.id === userId);

  if (userIndex < 0) {
    return res.status(404).json({ message: "Could not find user." });
  }

  DUMMY_USERS.splice(userIndex, 1);

  res.status(200).json({ message: "Deleted user." });
});

app.put("/user/:id", (req, res, next) => {
  const userId = req.params.id;
  const { name, age } = req.body;

  const userIndex = DUMMY_USERS.findIndex((user) => user.id === userId);

  if (userIndex < 0) {
    return res.status(404).json({ message: "Could not find user." });
  }

  if(!name || typeof name !== "string" || name.trim().length === 0){
    return res.status(422).json({
      message: "Invalid name, name must be string and can't be empty.",
    });
  }

  if(!age || isNaN(age) || age <= 0){
    return res.status(422).json({
      message: "Invalid age, age must be a number and must be greater than 0.",
    });
  }

  const updatedUser = {
    id: userId,
    name,
    age,
  };

  DUMMY_USERS[userIndex] = updatedUser;

  res.status(200).json({ message: "Updated user.", user: updatedUser });
});

app.listen(4000); // start Node + Express server on port 5000
