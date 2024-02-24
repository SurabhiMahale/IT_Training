import express from 'express';
import Student from '../Schema/studentSchema.js';

const studentRouter = express.Router();

// POST 
studentRouter.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      courseProgress,
      contactInformation
    } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      password,
      username,
      courseProgress,
      contactInformation
    });

    res.status(201).json({ message: 'Student added successfully', data: newStudent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to add student', error: error.message });
  }
});

// GET 
studentRouter.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
});

// PUT
studentRouter.put('/:id', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      courseProgress,
      contactInformation
    } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      password,
      username,
      courseProgress,
      contactInformation
    }, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', data: updatedStudent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to update student', error: error.message });
  }
});

// DELETE 
studentRouter.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
});

export default studentRouter;
