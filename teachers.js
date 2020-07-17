
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

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
        occupation_area: foundTeacher.occupation_area.split(","),
        created_at: new Intl.DateTimeFormat("en-US").format(foundTeacher.created_at),
    }

    return res.render('show', { teacher })
}

exports.edit = function(req, res) {
    const id = req.params.id

    const foundTeacher = data.teachers.find((teacher) => id == teacher.id)

    if (!foundTeacher) {
        return res.send("Teacher not found")
    }

    teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('edit', { teacher })
}