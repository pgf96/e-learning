const express = require("express")
const router = express.Router()
const passport = require("passport")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/courses")
})

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    // Optionally force pick account every time
    // prompt: "select_account"
  })
)

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/courses",
    failureRedirect: "/courses",
  })
)
// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect("/courses")
  })
})

module.exports = router
