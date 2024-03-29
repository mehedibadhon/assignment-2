const express = require('express');
const bodyParser = require('body-parser');
const Leaders=require('../models/leaders');
 
const leaderRouter = express.Router();
 
leaderRouter.use(bodyParser.json());
 
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    Leaders.find({})
    .then((Leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(Leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((Leaders)=>{
        console.log('Promotion Created',Leaders);
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(Leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((Leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(Leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));})
.post((req,res,next) => {
    res.end("Saving the leader no. "+req.params.leaderId);
})
.put((req,res,next) => {
    res.end("PUT request does not work for the leader no. "+req.params.leaderId);
})
.delete((req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
 
module.exports = leaderRouter;
