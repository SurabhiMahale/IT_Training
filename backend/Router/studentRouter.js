import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Student from "../Models/studentSchema.js"; 

const router = express.Router();

// Authorization routes
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactInformation } = req.body;
9
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).send({ msg: "Invalid email format" });
    }

    // Validate password length
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).send({ msg: "Password must be at least 6 characters long" });
    }

    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      return res.status(400).send({ msg: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactInformation
    });

    await newStudent.save();
    res.status(200).send({ msg: "Registered successfully!" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (!existingStudent) {
      return res.status(400).send({ msg: "Email doesn't exist!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingStudent.password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ msg: "Password Incorrect!" });
    }
    
    const token = jwt.sign({ _id: existingStudent._id }, process.env.JWT_SECRET);
    // console.log("Token:", token );
    res.status(200).send({ msg: "Login successful!", token });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});
export default router;
