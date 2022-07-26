const fs = require('fs')

const readingWritingDataBase = {
    reading: () => {
        return JSON.parse(fs.readFileSync(__dirname + '/DB.json','utf-8'))
    },

    writing: (data) => {
        return fs.writeFileSync(__dirname + '/DB.json',JSON.stringify(data,null,'\t'))
    }
}

module.exports = {readingWritingDataBase}
