const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const path = require("path");

const app = express();

const bookRouter = express.Router();
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));


app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
    .get((req, res)=>{
        res.render('books',{nav:[{title:"Books", link:'books'},{title:'Author', link:'author'}]});
    })

app.use('/books',bookRouter);
app.get('/', (req, res)=>{
    res.render("index",{nav:[{title:"Books", link:'books'},{title:'Author', link:'author'}]})
})

app.listen(3000, ()=>{
    console.log(`Serving on port ${chalk.green(3000)}`);

})