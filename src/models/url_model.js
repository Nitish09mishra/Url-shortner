const mongoose= require('mongoose')

const ShortUrlSchema= new mongoose.Schema({
    url: {
        type: String,
        required: true,
    }, 
    ShortId: {
        type: String,
        required: true,
    }
})

const ShortUrl= mongoose.model('shortUrl', ShortUrlSchema)

module.exports= ShortUrl