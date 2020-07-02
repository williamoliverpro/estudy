const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function (req, res) {
    return res.redirect("teachers")
})

routes.get('/teachers', function (req, res) {

    return res.render("teachers")
})

routes.get('/teachers/create', function (req, res) {

    return res.render("create-teacher")
})

routes.post('/teachers', teachers.post)

routes.get('/students', function (req, res) {
    return res.render("students")
})

routes.use(function (req, res) {
    res.status(404).render("not-found");
});

module.exports = routes