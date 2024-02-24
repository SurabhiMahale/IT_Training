import jwt from "jsonwebtoken";
import Student from "../Models/studentSchema.js";

const studVerify = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({
      msg: "Token not found!",
    });
  }

  try {
    let stud = jwt.verify(token, process.env.JWT_SECRET);
    stud = await Student.findOne({ _id: stud._id }, { name: 1 });
    req.stud = stud;
    next();
  } catch (error) {
    res.status(400).send({
      msg: error.message,
    });
  }
};

export default studVerify;