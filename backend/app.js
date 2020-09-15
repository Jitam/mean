const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Post = require('./models/post')

const app = express();
// df62XHzFFb4rPhdV
mongoose.connect("mongodb+srv://jitam:df62XHzFFb4rPhdV@udemyapp.bfdgl.mongodb.net/udemy-mern?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to Database');
}).catch(() => {
  console.log("Connection Failed")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS")
  next();
})

app.post("/api/posts", (req,res,next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdId => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdId._id
    })
  });

});

app.put("/api/posts/:id", (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Update Successful"
    })
  })
})

app.get('/api/posts',(req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Fetching json data',
      posts: documents
    })
  });

});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted"
    })
  })
  // console.log(req.params.id);
});

module.exports = app;
