const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

BlogPost.find({},(error,blogpost)=>{
    console.log(error,blogpost)
})

BlogPost.find({
    title:'See You Again'
}, (error, blogpost)=>{
    console.log(error,blogpost)
})

BlogPost.find({
    title:'/See/'
}, (error, blogpost)=>{
    console.log(error,blogpost)
})

var id = "6282ff2ef5f9d9462fe9407b";

BlogPost.findById(id, (error, blogpost)=>{
    console.log(error,blogpost)
})

BlogPost.findByIdAndUpdate(id, {
    title:'Updated title'
}, (error, blogpost)=>{
    console.log(error,blogpost)
})

BlogPost.findByIdAndDelete(id, (error, blogpost)=>{
    console.log(error,blogpost)
})