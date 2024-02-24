import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from './config/db.js';
import studentRouter from './Router/studentRouter.js';

dotenv.config();
const app = express();

//const PORT = 5000;
connectDatabase();

app.use(express.json());
app.use(cors());

app.use('/api/student', studentRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});