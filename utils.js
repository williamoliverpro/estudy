module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        let month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 & today.getDate() < birthDate.getDate()) {
            age--
        }

        return age
    },
    date: function (timestamp) {
            const date = new Date(timestamp)

            const year = date.getUTCFullYear()

            const month = `0${date.getUTCMonth() + 1}`.slice(-2)

            const day = `0${date.getUTCDate()}`.slice(-2)

            return `${year}-${month}-${day}`
    },
    graduation: function(education) {
        if (education === "highschool") {
            return "Complete High School"
            console.log(education)
        } else if (education === "highereducation"){
            return "Complete Higher Education"
            console.log(education)
        } else if (education === "master") {
            return "Master's"
            console.log(education)
        } else {
            return "Doctorate degree"
            console.log(education)
        }
        console.log(education)
    }
}