// require express module

const express = require("express");
let app = express();

const path = require("path"); // use for ejs

// display fact id
const { v4: uuidv4 } = require('uuid');

// use HTTP methods like PUT, DELETE in places where only GET and POST are supported
var methodOverride = require('method-override');
const { connect } = require("http2");


// require ejs templating engine and location of the directory where your view templates

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Serving Static Files (CSS & JS)

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
// create port 
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollage",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "khushalrathod",
        content: "Hard work is important to achieve success."
    },
    {
        id: uuidv4(),
        username: "yashbhaliya",
        content: "I got selected for my 1st internship!"
    },
    {
        id: uuidv4(),
        username: "darshanparmar",
        content: "Exploring new coding languages."
    },
    {
        id: uuidv4(),
        username: "avsarsuvagiya",
        content: "I love solving coding challenges."
    }
];

// Create All Route

//1. home route(home.ejs)

app.get("/posts", (req, res) => {
    res.render("home.ejs", { posts });
})

// 2. new route(new ejs)

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
})

// 3. implement : GET/posts/:id (show route) (one user information find ) (see one user information)


app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs", { post });
})

// 4. implement : PATCH/posts/:id (update route) (update specific post)


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newUsername = req.body.username;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    post.username = newUsername;
    console.log(post);
    res.redirect('/posts');

})
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", { post });
})


// 5 . implement : /posts/:id (Destroy route)


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")

});




// listen port in 8080
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})

