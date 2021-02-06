const express= require('express')
const shortId= require('shortid')
const mongoose= require('mongoose')
const path= require('path')
const ejs= require('ejs')
const createHttpError= require('http-errors')
const ShortUrl = require('./src/models/url_model')

const app= express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

app.set('view engine', 'ejs');
require('./src/db/mongoose')

app.get('/', async (req, res, next) => {
    res.render('index')
  })
  
  app.post('/', async (req, res, next) => {
    try {
      const { url } = req.body
      if (!url) {
        throw createHttpError.BadRequest('Provide a valid url')
      }
      const urlExists = await ShortUrl.findOne({ url })
      if (urlExists) {
        res.render('index', {
          // short_url: `${req.hostname}/${urlExists.shortId}`,
          short_url: `${req.headers.host}/${urlExists.shortId}`,
        })
        return
      }
      const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
      const result = await shortUrl.save()
      res.render('index', {
        // short_url: `${req.hostname}/${urlExists.shortId}`,
        short_url: `${req.headers.host}/${result.shortId}`,
      })
    } catch (error) {
      next(error)
    }
  })
  
  app.get('/:shortId', async (req, res, next) => {
    try {
      const { shortId } = req.params
      const result = await ShortUrl.findOne({ shortId })
      if (!result) {
        throw createHttpError.NotFound('Short url does not exist')
      }
      res.redirect(result.url)
    } catch (error) {
      next(error)
    }
  })
  
  app.use((req, res, next) => {
    next(createHttpError.NotFound())
  })
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('index', { error: err.message })
  })

app.listen(3000, () => {
    console.log("Server is up on port 3000!")
})