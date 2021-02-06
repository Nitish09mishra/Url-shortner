// const express= require('express')
// const router= new express.Router()
// const createHttpError= require('http-errors')
// const ShortUrl = require('../models/url_model')

// router.get('/', async(req, res, next)=> {
//     res.render('index')
// })

// router.post('/', async (req, res, next) => {
//     try {
//       const { url } = req.body
//       if (!url) {
//         throw createHttpError.BadRequest('Provide a valid url')
//       }
//       const urlExists = await ShortUrl.findOne({ url })
//       if (urlExists) {
//         res.render('index', {
//           short_url: `${req.headers.host}/${urlExists.shortId}`,
//         })
//         return
//       }
//       const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
//       const result = await shortUrl.save()
//       res.render('index', {
//         short_url: `${req.headers.host}/${result.shortId}`,
//       })
//     } catch (error) {
//       next(error)
//     }
// })

// router.get('/:shortId', async (req, res, next) => {
//     try {
//       const { shortId } = req.params
//       const result = await ShortUrl.findOne({ shortId })
//       if (!result) {
//         throw createHttpError.NotFound('Short url does not exist')
//       }
//       res.redirect(result.url)
//     } catch (error) {
//       next(error)
//     }
// })

// module.exports = router