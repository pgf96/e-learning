var express = require('express');
var router = express.Router();
const coursesCtrl = require('../controllers/courses');
// const isLoggedIn = require('../config/auth')

// GET /movies - show all movied
router.get('/', coursesCtrl.index)
router.get('/users', coursesCtrl.user)
router.get('/new', coursesCtrl.new)
router.get('/new/:id/content', coursesCtrl.newContent)

router.get('/:id', coursesCtrl.show)

router.delete('/:id', coursesCtrl.delete)

router.post('/', coursesCtrl.create)
router.post('/new/:id/content', coursesCtrl.createContent)

module.exports = router