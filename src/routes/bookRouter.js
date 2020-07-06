const express = require('express');
const { MongoClient,ObjectID } = require('mongodb');
const bookRouter = express.Router();

bookRouter.route('/')
    .get((req, res) => {
        (async function mongo(){
            let client;
            const url = "mongodb://localhost:27017"
            const dbName = 'LibraryDB'
            try {
                client = await MongoClient.connect(url);  
                console.log("connection successful");
                const db = client.db(dbName);
                const books = await db.collection('books').find().toArray();
                res.render('books', {
                    nav: [{
                        title: "Books",
                        link: 'books'
                    }, {
                        title: 'Author',
                        link: 'author'
                    }],
                    books
                });     
            } catch (error) {
               console.log(error.stack); 
            }
        }())         
    })


bookRouter.route('/:id')
    .get((req, res) => {
        const url = "mongodb://localhost:27017"
        const dbName = 'LibraryDB'
        const {id} = req.params;
        (async function mongo(){
            let client;
            try{client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const book = await db.collection("books").findOne({_id:new ObjectID(id)});
                console.log(book);
            res.render('book', {
                nav: [{
                    title: "Books",
                    link: 'books'
                }, {
                    title: 'Author',
                    link: 'author'
                }],
                book
            });}
            catch(err){
                console.log(err.stack);
            }
        }());
     })

module.exports = bookRouter;