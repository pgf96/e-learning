const express = require("express")
const router = express.Router()
const coursesCtrl = require("../controllers/courses")
const isLoggedIn = require("../config/auth")

router.get("/", coursesCtrl.index)
router.get("/new", isLoggedIn, coursesCtrl.new)
router.get("/new/:id/content", coursesCtrl.newContent)
router.get("/disclaimer", coursesCtrl.disclaimer)

router.get("/:id", isLoggedIn, coursesCtrl.show)

router.get("/:id/edit", isLoggedIn, coursesCtrl.edit)
router.put("/:id", isLoggedIn, coursesCtrl.update)

router.delete("/:id", isLoggedIn, coursesCtrl.delete)

router.post("/", isLoggedIn, coursesCtrl.create)
router.post("/new/:id/content", isLoggedIn, coursesCtrl.createContent)

module.exports = router
