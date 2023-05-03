const express = require('express')
const fs = require('fs')

const utils = require('./modules/utils')

const port = 3000
const app = express()

app.set('view engine', 'hbs')
app.use('/public', express.static('public'))

const load_boards = () => {
    let list = []

    boards = fs.readdirSync('./public/library/')
    for(let i = 0; i < boards.length; i++){
        list.push(boards[i])
    }

    return list
}
const load_board = (data) => {
    let list = []
    if(typeof(data) == "string"){  
        images = fs.readdirSync(`./public/library/${data}/`)
        for(let i = 0; i < images.length; i++){
            list.push([data, images[i]])
        }
    }
    else{
        for(let i = 0; i < data.length; i++){
            images = fs.readdirSync(`./public/library/${data[i]}/`)
            for(let j = 0; j < images.length; j++){
                list.push([data[i], images[j]])
            }
        }
    }

    return list
}

app.get('/', function(req, res){
    const board_list = load_boards()
    
    // Query
    const boardID = req.query.boardID
    const boardName = req.query.board

    if(boardName == undefined){    
        board = board_list[boardID]
        if(board == undefined) board = board_list
    }
    else{
        board = boardName.replace(' ', '')
        if(board.includes(',')){
            board = board.split(',')
        }
    }
    console.log(`Current board: ${board}`)

    const image_set = load_board(board)
    res.render('index', {
        board_list: JSON.stringify(board_list),
        image_set: JSON.stringify(image_set)
    })
})

utils.server_log(__dirname, port)
app.listen(port)