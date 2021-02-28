let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Book = require('../models/book');

// Route for the book list
module.exports.displayBookList = (req,res,next)=>{
    Book.find((err, BookList)=>{
        if(err){
            return console.error(err);
        }
        else
        {
           console.log(BookList);

            res.render('book/list',
            {title: 'Books',
            BookList: BookList,
            displayName: req.user ? req.user.displayName : ''});
        }
        });
}

// Display Add Page 
module.exports.displayAddPage = (req, res, next)=> {
    res.render('book/add', {title: 'Add Book',
    displayName: req.user ? req.user.displayName : ''});
}

// Processing Add Page 

module.exports.processAddPage = (req, res, next)=> {
    console.log(req.body);
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the page
            res.redirect('/book-list');
        }     
    });
}

// display edit page
module.exports.displayEditPage = (req, res, next)=> {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('book/edit', {title:'Edit Book', book: bookToEdit,
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

// processing edit page
module.exports.processEditPage = (req, res, next)=> {
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/book-list');
        }
   });
}

// delete 

module.exports.performDelete = (req, res, next)=> {
    let id = req.params.id;

    Book.remove({_id: id}, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
}
