const express = require('express');
const hbs = require('hbs');

var app = express();

const pageName = "Stewart Boyd";
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
app.get("/dog", (req, res) => {

    //res.send('<h1>hello express</h1>');
    var content = {pageName: "Stewart Boyd",
        currentYear: new Date().getFullYear(),
        welcomeMessage: "Good to meet you"};
    console.log(content);
    app.render("home.hbs", content);
});

app.get("/about", (req, res) => {
    //res.send('<h1>hello express</h1>');
    //res.send("<h1>this is the about</h1>");
    // Render allows your to render using your view engine 
    // a view. Views for view engines are by default looked for
    // in the view directory
    res.render('about.hbs', {pageName: "Stewart Boyd",
        currentYear: new Date().getFullYear()});
});

app.get("/bad", (req, res) => {
    res.send({errorMessage: "Unable to handle Requesto"});
})
app.listen(3000, () => {
    console.log("Server is up");
});