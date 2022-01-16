const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
// const { result } = require("lodash")

const { render } = require("express/lib/response")
const blogRoutes = require("./routes/blogRoutes")
const dotenv = require("dotenv")
dotenv.config()

// express app

const app = express()

mongoose.connect(process.env.CONNSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        // listen for requests
        app.listen(3000)
    })
    .catch((error) => console.log(error))

// register view engine
app.set('view engine', 'ejs')



// middleware & static files
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// mongoose and mongo sanbox routes
// app.get('/add-blog',(req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog 2',
//         body: 'more about my new blog 2'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => console.log(error))
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById("61e252432713d848a8a1616c")
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => console.log(error))
// })

// routes
app.get('/', (req, res) => {

    // const blogs = [
    //     {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    //     {title: "Mario finds stars", snippet: "Fusce a diam vitae nibh venenatis congue."},
    //     {title: "How to defeat bowser", snippet: "Nulla sed erat ac neque convallis fringilla sed quis est."},
    // ]

    // res.send('<p>home page</p>')
    // res.sendFile('./views/index.html', { root: __dirname })
    // res.render('index', { title: "Home", blogs: blogs })
    res.redirect('/blogs')

})

app.get('/about', (req, res) => {

    // res.send('<p>about page</p>')
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: "About" })

})

app.use('/blogs', blogRoutes)

// redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// 404 errors page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: "404 Not Found" })
})



