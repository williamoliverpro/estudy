
const fs = require('fs')
const data = require('./data.json')
const { age, date, graduation } = require('./utils')

exports.post = function (req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please evaluate the data and try again")
        }
    }


    let { avatar_url, name, birth, education_level, class_type, occupation_area } = req.body
    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)


    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education_level,
        class_type,
        occupation_area,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return send("Write file error")

        return res.redirect("/teachers")
    })
}

exports.show = function (req, res) {
    const id = req.params.id

    const foundTeacher = data.teachers.find((teacher) => id == teacher.id)

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        education_level: graduation(foundTeacher.education_level),
        occupation_area: foundTeacher.occupation_area.split(","),
        created_at: new Intl.DateTimeFormat("en-US").format(foundTeacher.created_at),
    }

    return res.render('show', { teacher })
}

exports.edit = function (req, res) {
    const id = req.params.id

    const foundTeacher = data.teachers.find((teacher) => id == teacher.id)

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
        education_level: graduation(foundTeacher.education_level)
    }

    return res.render('edit', { teacher })
}

exports.update = function (req, res) {
    const { id } = req.body

    let index = 0

    const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex
            
            return true
            }
        }
    )

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return send("Write file error")

        return res.redirect(`/teachers/${teacher.id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => teacher.id != id)

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return send("Write file error")

        return res.redirect(`/teachers`)
    })
}

exports.index = function (req, res) {

    return res.render("teachers", {teachers: data.teachers})
}