const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

const downloadCSV = async (url) => {
    //   const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
    const path = Path.resolve(__dirname, '../public', 'file.csv');
    const writer = Fs.createWriteStream(path)
    console.log('download start');

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })
    console.log('downloaded');
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}


module.exports = { downloadCSV }