const express = require('express')
const itemRoutes = require('./routes')
const ExpressError = require ('./expressError')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/items', itemRoutes)






app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: { message, status }
    })
})

app.use(function(req,res, next){
    return res.json(new ExpressError("Ooops there is nothing here", 404))
})

app.listen(3000, function () {
    console.log('App on port 3000');
})







