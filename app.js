const express = require('express')
const {glob} = require('glob')
const fs = require('fs')

require('dotenv').config()

const utils = require('./modules/utils')

const port = process.env.PORT
const app = express()

app.set('view engine', 'hbs')
app.use('/public', express.static('public'))

async function load_libraries(){
    let libraries = []
    
    const scan = fs.readdirSync('./public/library/')
    for(let i = 0; i < scan.length; i++){
        const image = await fetch_images(scan[i])
        libraries.push([scan[i], image[0]])
    }
    
    return libraries
}
async function fetch_images(library){
    let data = []

    const scan = await glob(`./public/library/${library}/*.*`)
    for(let i = 0; i < scan.length; i++){
        const image = scan[i].replaceAll('\\', '/')
                             .replaceAll(' ', '%20')
        data.push(image)
    }

    return data
}

app.get('/', async function(req, res){
    const boards = await load_libraries()

    res.render('index', {
        boards: JSON.stringify(boards)
    })
})

app.get('/draw', async function(req, res){
    const board = req.query.board

    const images = await fetch_images(board)
    const image = images[utils.random_range(images.length)]

    res.render('draw', {
        images: JSON.stringify(image)
    })
})

utils.server_log(__dirname, port)
app.listen(port)