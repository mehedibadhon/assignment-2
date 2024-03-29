const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const Promotions=require("../models/promotions");
 
const promoRouter = express.Router();
 
promoRouter.use(bodyParser.json());
 
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((Promotions)=>{
        console.log('Promotion Created',Promotions);
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(Promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((Promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(Promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));})
.post((req,res,next) => {
    res.end("Saving the leader no. "+req.params.leaderId);
})
.post((req,res,next) => {
    res.end("Saving the promotion no. "+req.params.promoId);
})
.put((req,res,next) => {
    res.end("PUT request does not work for the promotion no. "+req.params.promoId);
})
.delete((req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
 
module.exports = promoRouter;
