/// Version 1.1.0
const fs = require('fs')

/* Math */
const max_value = (max, val) => {
    if (max > val) val = max
    return val
}

// Random
const random_number = (len) => {
    return Math.floor(Math.random() * len)
}
const random_range = (max) => {
    return Math.floor(Math.random() * max)
}

/* Data */
// Array
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]

        arr[i] = arr[j]
        arr[j] = temp
    }

    return arr
}
const random_array = (arr) => {
    return arr[random_number(arr.length)]
}

// Json
const load_json = (dir) => {
    const data_raw = fs.readFileSync(dir)
    const data_json = JSON.parse(data_raw)

    return data_json
}

/* String */
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Other */
const project_name = (__dirname) => {
    return __dirname.split('\\')[__dirname.split('\\').length - 1]
}

const server_log = (__dirname, port) => {
    console.log("Server status: Running")
    console.log(` - App: ${ capitalize(project_name(__dirname)) }`)
    console.log(` - Port: ${ port }`)
}

/* Export */
module.exports = {
    random_number,
    random_array,
    random_range,
    capitalize,
    server_log,
    load_json,
    max_value,
    shuffle
}