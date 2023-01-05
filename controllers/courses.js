const Course = require("../models/course")
const User = require("../models/user")

const index = (req, res) => {
  Course.find({})
    .populate("user")
    .exec(function (err, courses) {
      res.render("courses/index", { title: "all courses", courses })
    })
}

const newCourse = (req, res) => {
  res.render("courses/new", { title: "add a course" })
}

const show = (req, res) => {
  Course.findById(req.params.id)
    .populate("user")
    .exec((err, course) => {
      res.render("courses/show", { title: "show page", course })
    })
}

const create = (req, res) => {
  req.body.user = req.user
  const course = new Course(req.body)
  // course.user = req.user
  console.log(course)
  course.save((err) => {
    res.redirect(`/courses/new/${course._id}/content`)
  })
}

const createContent = (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    console.log(req.body)
    if (!Array.isArray(req.body.sectionTitle)) {
      course.contents.push(req.body)
      course.save()
      return res.redirect("/courses")
    } else {
      const output = req.body.sectionTitle.map((sectionTitle, index) => ({
        sectionTitle,
        description: req.body.description[index],
        body: req.body.body[index],
      }))
      output.forEach((content) => {
        course.contents.push(content)
        console.log(content)
      })
      course.save((err) => {
        res.redirect("/courses")
      })
    }
  })
}

const newContent = (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) console.log(err)
    res.render("courses/content", { title: course.title, course })
  })
}

const deleteCourse = (req, res) => {
  Course.deleteOne({ _id: req.params.id }).then(() => {
    console.log(req.params.id)
    res.redirect("/courses")
  })
}

const edit = (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) console.log(err)
    res.render("courses/edit", { course })
  })
}

const update = (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  Course.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (err) console.log(err)
    res.redirect(`/courses/${req.params.id}`)
  })
}

module.exports = {
  index,
  new: newCourse,
  create,
  newContent,
  createContent,
  show,
  delete: deleteCourse,
  edit,
  update,
}
