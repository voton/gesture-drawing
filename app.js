const express = require('express')
const fs = require('fs')

const utils = require('./modules/utils')

const port = 3000
const app = express()

app.set('view engine', 'hbs')
app.use('/public', express.static('public'))

const list_boards = () =>{
    let list = []

    const boards = fs.readdirSync('./public/library/')
    for (let i = 0; i < boards.length; i++){
        const board = boards[i]
        list.push([board, load_image(board)])
    }
    
    return list
}
const load_image = (board) =>{
    const image = fs.readdirSync(`./public/library/${board}/`)[1]
    return image.replace(' ', '%20')
}

const load_images = (board) => {
    let list = []

    const images = fs.readdirSync(`./public/library/${board}/`)
    for(let i = 0; i < images.length; i++){
        list.push(images[i])
    }

    return list
}

app.get('/', function(req, res){
    const boards = JSON.stringify(list_boards())

    res.render('index', {
        boards: boards
    })
})

app.get('/practice', function(req, res){
    const board = req.query.board
    const images = load_images(board)

    res.render('draw', {
        images: JSON.stringify(images),
        board: board
    })
})

utils.server_log(__dirname, port)
app.listen(port)