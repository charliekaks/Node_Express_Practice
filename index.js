const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res)=>{
    res.send("Relearning node and express")
})

app.listen(3000, ()=>{
    console.log(`Serving on port ${chalk.green(3000)}`);

})