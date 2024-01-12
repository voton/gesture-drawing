const {glob} = require('glob')
const fs = require('fs')

async function load_libraries(){
    let libraries = [['All', 'public/library/Ideas%20-%20SFW/916412224162360834.jpg']]
    
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
async function fetch_all_images(){
    images = []
    const data = await load_libraries()
    for(x = 0; x < data.length; x++){
        const lib = await fetch_images(data[x][0])
        for(y = 0; y < lib.length; y++){
            images.push(lib[y])
        }
    }

    return images
}

module.exports = {
    fetch_all_images,
    load_libraries,
    fetch_images
}