const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const keys = {
  secretOrKey: "secret",
};

const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");
const Chat = require("../models/Chat");

// @route    POST api/faculty/register
// @desc     Register a faculty
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").isLength({ min: 1 }),
    check("dept", "Please enter department").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, name, dept } = req.body;

    try {
      let faculty = await Faculty.findOne({ email });

      if (faculty) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;

          Faculty.create({ email, password: hash, name, dept })
            .then((newFaculty) => {
              const payload = {
                email: newFaculty.email,
                name: newFaculty.name,
                dept: newFaculty.dept,
              };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ success: true, token });
              });
            })
            .catch((err) => res.status(500).send("Server Error"));
        });
      });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/faculty/login
// @desc     Login a Faculty
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let faculty = await Faculty.findOne({ email });

      if (!faculty) {
        return res.status(400).json({ errors: [{ msg: "User does not exist" }] });
      }

      const isMatch = await bcrypt.compare(password, faculty.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid login" }] });
      }

      const payload = { email: faculty.email, name: faculty.name, dept: faculty.dept };

      jwt.sign(payload, keys.secretOrKey, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/faculty/current
// @desc    Return current user
// @access  Private
router.get("/current", auth, async (req, res) => {
  try {
    const profile = await Faculty.findOne({ email: req.user.email });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/faculty/courses
// @desc    Add a course
// @access  Private
router.post("/courses", auth, async (req, res) => {
  const { course, year } = req.body;

  try {
    const newCourse = await Course.create({
      dept: req.user.dept,
      faculty: req.user.name,
      course,
      year,
    });
    res.json(newCourse);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   GET api/faculty/courses
// @desc    Get all courses offered by faculty
// @access  Private
router.get("/courses", auth, async (req, res) => {
  try {
    const courses = await Course.find({ faculty: req.user.name });
    res.json(courses);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   PUT api/faculty/archive/:course/:year
// @desc    Change the course offered by faculty to archived
// @access  Private
router.put("/archive/:course/:year", auth, async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { faculty: req.user.name, course: req.params.course, year: req.params.year, archived: false },
      { archived: true },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   PUT api/faculty/unarchive/:course/:year
// @desc    Change the course offered by faculty to unarchived
// @access  Private
router.put("/unarchive/:course/:year", auth, async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { faculty: req.user.name, course: req.params.course, year: req.params.year, archived: true },
      { archived: false },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   GET api/faculty/students/:year
// @desc    Get students of a year
// @access  Private
router.get("/students/:year", auth, async (req, res) => {
  try {
    const students = await Student.find({ year: req.params.year, dept: req.user.dept }).sort("roll");
    res.json(students);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/faculty/attendance/:year/:roll/:course
// @desc    Mark attendance for a student
// @access  Private
router.post("/attendance/:year/:course", auth, async (req, res) => {
  const { attendance } = req.body; // Array of { roll, date, status }
  const { year, course } = req.params;
  // console.log(attendance,year,course);

  if (!Array.isArray(attendance)) {
    return res.status(400).json({ msg: "Attendance data must be an array" });
  }

  try {
    const courseRecord = await Course.findOne({
      faculty: req.user.name,
      year,
      course,
    });

    if (!courseRecord) {
      return res.status(400).json({ msg: "Invalid course or faculty" });
    }

    const results = await Promise.all(
      attendance.map(async ({ roll, date, status }) => {
        const student = await Student.findOne({ roll });

        if (!student) {
          throw new Error(`Student with roll ${roll} not found`);
        }

        const newAttendance = await Attendance.create({
          roll,
          course,
          year,
          name: student.name,
          date,
          status,
        });

        return newAttendance;
      })
    );

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// @route   GET api/faculty/attendance/:year/:roll/:course
// @desc    Get attendance of a student
// @access  Private
router.get("/attendance/:year/:roll/:course", auth, async (req, res) => {
  try {
    const attendance = await Attendance.find({
      roll: req.params.roll,
      year: req.params.year,
      course: req.params.course,
    });
    res.json(attendance);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   PUT api/faculty/attendance/:year/:roll/:course/:date
// @desc    Update attendance of a student
// @access  Private
router.put("/attendance/:year/:roll/:course/:date", auth, async (req, res) => {
  const { status } = req.body;

  try {
    const attendance = await Attendance.findOneAndUpdate(
      { roll: req.params.roll, year: req.params.year, course: req.params.course, date: req.params.date },
      { status },
      { new: true }
    );
    res.json(attendance);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   GET api/faculty/chat/:course/:year
// @desc    Get chat messages for a course and year
// @access  Public
router.get("/chat/:course/:year", async (req, res) => {
  try {
    const chats = await Chat.find({ course: req.params.course, year: req.params.year });
    res.json(chats);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/faculty/chat/:course/:year
// @desc    Post a message to the chat for a course
// @access  Private
router.post("/chat/:course/:year", auth, async (req, res) => {
  const { message } = req.body;

  try {
    const newMessage = await Chat.create({
      course: req.params.course,
      year: req.params.year,
      message,
      faculty: req.user.name,
    });
    res.json(newMessage);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
