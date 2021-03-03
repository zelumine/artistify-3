const express = require("express");
const router = express.Router();
const User = require("./../model/User");
const bcrypt = require("bcrypt");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/signout", (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect("/signin");
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
      res.flash("warning", "email already registered");
      res.render("auth/signin");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      req.flash("success", "Congrat! You're in!");
      res.redirect("/auth/signin");
    }
  } catch (error) {
    let errorMsg = "";
    for (field in error.errors) {
      errorMsg += error.errors[field].message + "\n";
    }
    req.flash("error", errorMsg);
    res.redirect("/auth/signin");
  }
});

router.post("/signin", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username })
  .then(foundUser => {
    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password;

        req.session.currentUser = userObject;

        req.flash("success", "Successfully logged in...");
        res.redirect("/index");
      }
    }
  })
  .catch(next);
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/auth/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password;

      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect("/");
    }
  }
});


module.exports = router;