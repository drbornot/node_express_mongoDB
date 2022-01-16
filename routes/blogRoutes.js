const express = require("express")
const router = express.Router()
const blogController = require("../controllers/BlogController")

router.get('/', blogController.blog_index)

router.get('/create', blogController.blog_create_get)

router.post('/', blogController.blog_create_post) 

router.get('/:id', blogController.blog_details)

// app.put('/blogs/:id')

router.delete('/:id', blogController.blog_delete)

module.exports = router