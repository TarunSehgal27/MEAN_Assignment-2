const router = require("express").Router();
const User = require("../models/user");
const argon = require("argon2");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!validateEmail(email)) {
    return res.json({ error: "Email not valid!" });
  }

  const user = await User.findOne({ username });
  const emailCheck = await User.findOne({ email });

  if (user || emailCheck) {
    return res.json({ error: "Username or Email already exists!" });
  }
  const hash = await argon.hash(password);

  const newUser = await User.create({ username, email, password: hash });
  return res.json({ newUser });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const emailCheck = await User.findOne({ email });

  if (!emailCheck) {
    return res.json({ error: "Email doesn't exists" });
  }

  const verPass = await argon.verify(emailCheck.password, password);

  if (!verPass) return res.json({ error: "Password is incorrect" });

  return res.json({ emailCheck });
});

router.post("/profile", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  // console.log(req.body);
  if (!user) return res.json({ error: "User doesn't exists" });

  return res.json({ user });
});

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

module.exports = router;
