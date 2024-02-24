import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  courseProgress: {
    type: Object // we can define this more precisely based on needs
  },
  contactInformation: {
    type: Object 
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
