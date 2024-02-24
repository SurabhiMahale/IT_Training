import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from './config/db.js';
import studentRouter from './Router/studentRouter.js';
import studVerify from "./middlewares/studVerify.js";

dotenv.config();
const app = express();

connectDatabase();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to IT Training API");
});

app.get("/api", studVerify, (req, res) => {
  res.send({
    authenticated: true,
    user: req.user,
  });
});

app.use('/api/student', studentRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});