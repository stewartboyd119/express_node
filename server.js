const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// heroku will set this environment varilable (or allows it to still run locally)
const port = process.env.PORT || 3000;

var app = express();


const pageName = "Stewart Boyd";
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.writeFile(__dirname + "/output.txt", log, {flag: "a"}, (err) => {
        if (err) throw err;
        console.log('file written too');
        next();
    })
})

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", (element) => element.toUpperCase());

app.get("/", (req, res) => {

    //res.send('<h1>hello express</h1>');
    var content = {pageName: "Stewart Boyd",
        welcomeMessage: "Good to meet you"};
    res.render("home.hbs", content);
});

app.get("/project", (req, res) => {
    res.render("project.hbs");
});

app.get("/about", (req, res) => {
    //res.send('<h1>hello express</h1>');
    //res.send("<h1>this is the about</h1>");
    // Render allows your to render using your view engine 
    // a view. Views for view engines are by default looked for
    // in the view directory
    res.render('about.hbs', {pageName: "Stewart Boyd"});
});

app.get("/bad", (req, res) => {
    res.send({errorMessage: "Unable to handle Requesto"});
})
app.listen(port, () => {
    console.log(`Server is up ${port}`);
});