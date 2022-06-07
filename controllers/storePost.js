const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = (req,res)=>{
    let image = req.files.image;
    console.log("image description!!");
    console.log("dirname",__dirname);
    console.log(image);
    image.mv(path.resolve(__dirname,'..','public/assets/img',image.name),async(error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/app/assets/img/' + image.name
        })
        res.redirect('/')
    })
}