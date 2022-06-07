const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useUnifiedTopology:true, useNewUrlParser:true})

const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleWare = require("./middleware/validationMiddleware")
const newUserController = require("./controllers/newUser")
const storeUserController = require("./controllers/storeUser")
const loginController = require("./controllers/login")
const loginUserController = require("./controllers/loginUser")
const logoutController = require("./controllers/logout")
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

global.loggedIn=null;

const app = new express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use('/posts/store',validateMiddleWare);
app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});


let port = process.env.PORT;
if (port==null || port==""){
    port=4000;
}
app.listen(port, ()=>{
    console.log('App listening...')
})

app.get('/',homeController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout',logoutController)
app.get('/post/:id',getPostController)
app.get('/posts/new',authMiddleware,newPostController)
app.post('/posts/store',authMiddleware,storePostController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)

