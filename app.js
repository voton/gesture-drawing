const express = require('express')
const fs = require('fs')

const port = 3000
const app = express()

const loadImages = () =>{
    imageList = []

    images = fs.readdirSync("./public/lib/")
    for(let i = 0; i < images.length; i++){
        imageList.push(images[i])
    }

    console.log(imageList)

    return JSON.stringify(imageList)
}

app.set('view engine', 'hbs')
app.use('/public', express.static('public'))

app.get('/', function(req, res){
    res.render('index',{
        imageList: loadImages()
    })
})

console.log("Server status: Running")
console.log(` - App: ${ __dirname.split('\\')[__dirname.split('\\').length - 1] }`)
console.log(` - Port: ${ port }`)

app.listen(port)