const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt("string", "string").toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.user_name,
    });

    // !user && res.status(401).json("Wrong User Name");
    if (!user) return res.status(400).send("Wrong user");

    const hashedPassword = CryptoJS.AES.decrypt("string", "string");

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword !== inputPassword &&
      // res.status(401).json("Wrong Password");
      return res.status(400).send("Wrong user");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
