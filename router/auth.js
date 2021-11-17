const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("<h1>Hello world from router js</h1>");
});

//!Using async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(422).json({
      message: "Please fill all the fields",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist 🤦‍♀️" });
    }
    const user = new User({ name, email, phone, work, password, cpassword });
    // !presave method
    const userRegister = await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({ message: "Awesome" });
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const userLogin = await User.findOne({ email: email });

    const isMatch = await bcyrpt.compare(password, userLogin.password);
    console.log(userLogin);
    if (!userLogin) {
      res.status(400).json({ message: "User Error" });
    } else {
      res.json({ message: "User signed  In Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//!Using Promises
// router.post("/register",(req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     res.status(422).json({
//       message: "Please fill all the fields",
//     });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email Already Exist 🤦‍♀️" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then((user) => {
//           return res
//             .status(201)
//             .json({ message: "User Registered Successfully" });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: "Failed to register.." });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
