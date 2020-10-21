const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')
// express app
//creating an instance of the app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:zhaofang@ninjablog.jt5g0.mongodb.net/node-ninja?retryWrites=true&w=majority'

//this is asynchronous
//we don't want our server listening until the connection has been establisted
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
//if you want to save your customized views
//app.set('views', 'myviews');


// middleware & static files
app.use(express.static('public'));
//takes all url encoded data
app.use(express.urlencoded({ extended: true }));

//use third party packages
//the argument dictates how the log info is formatted
app.use(morgan('dev'));


// mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res)=>{
//     //create a new instance of blog documents
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: "more about my new blog"
//     });
//     //from mongoose
//     blog.save().then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// })
// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//       .then((result)=>{
//           res.send(result);
//       })
//       .catch((err)=>{
//           console.log(err)
//       });
// })
// app.get('/single-blog',(req,res)=>{
//     Blog.findById('5f83788a4501324ab90c3746')
//       .then((result)=>{
//           res.send(result)
//       })
//       .catch((err)=>{
//         console.log(err)
//       });
// })

// //app.use is for every request, including post
// app.use((req,res,next)=>{
//     console.log('new request made:');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     //now you can move on to next middleware
//     next();
// });
// app.use((req,res,next)=>{
//     console.log('this is a next middleware.');
//     next();
// });

// common routes
app.get('/',(req,res)=>{
    //res.send('<p>home page</p>');
    //the relative path relative to this directory
    //res.sendFile('./views/index.html',{ root: __dirname});

    //instead the code above we render a view
    // const blogs = [
    //     {title:"Morganna", snippet: "The Fallen"},
    //     {title:"Kyle", snippet: "The Righteous"},
    //     {title:"Camille", snippet: "The Steel Shadow"}
    // ]
    // res.render('index',{ title: "Home", blogs: blogs});

    res.redirect('/blogs');
});


app.get('/about',(req,res)=>{
    //res.sendFile('./views/about.html',{ root: __dirname});
    res.render('about',{ title: "About"});
});

//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

// blog routes
// the first argument dictates how the url should start
app.use('/blogs',blogRoutes)
//set a 404 page
//this have to be at the very bottom
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{ root: __dirname})
    res.status(404).render('404',{ title: "404"});
});

