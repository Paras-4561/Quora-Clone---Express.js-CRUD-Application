const express = require("express");
const app = express()
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
    id : uuidv4(),
    username : "Consistency",
    content : "Consistency is a very important to achieve Success"
    },
    {
    id : uuidv4(),
    username : "Success",
    content : "Hardwork is very important for achieve Success in Life, So Work Hard and achieve Success"
    },
    {
    id : uuidv4(),
    username : "Paras Jain",
    content : "I got selected for Software Devloper Engineer (SDE) in My first interview in my college"
    },

];

app.get("/", (req, res) => {
    res.send("paras tuch");
}); 

app.get("/post", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/post/new", (req, res) => {
    res.render("new.ejs", {posts});
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/post");
});

app.get("/posts/:id", (req, res) => {
   let {id} = req.params;
   console.log(id);
   let post = posts.find((p) => id === p.id);
   res.render("show.ejs", { post } );
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/post");
    res.send("patch request working");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });

});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/post");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
});