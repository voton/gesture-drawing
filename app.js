const express = require('express')

const functions = require('./modules/functions')
const utils = require('./modules/utils')

const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.use('/public', express.static('public'))


app.get('/', async function(req, res){
    const boards = await functions.load_libraries()

    res.render('index', {
        boards: JSON.stringify(boards)
    })
})

app.get('/draw', async function(req, res){
    const board = req.query.board
    const timer = req.query.timer || 1000

    if(board == 'All') images = await functions.fetch_all_images()
    else images = await functions.fetch_images(board)

    image = images[utils.random_range(images.length)]

    res.render('draw', {
        images: JSON.stringify(image),
        time: timer
    })
})

app.get('/gallery', async function(req, res){
    const columns = req.query.col || 5


    images = await functions.fetch_all_images()
    images = utils.shuffle(images).splice(0, 100)

    res.render('gallery', {
        images: JSON.stringify(images),
        columns: columns
    })
})

app.get('/quick_shot', async function(req, res){
    const images_count = req.query.count || 3


    images = await functions.fetch_all_images()
    images = utils.shuffle(images).splice(0, images_count)

    res.render('quick_shot', {
        images: JSON.stringify(images),
        columns: images_count
    })
})

utils.server_log(__dirname, port)
app.listen(port)