import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port=3000;
const app = express();

app.set('view engine', 'ejs');

let posts =[];

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/post",(req,res)=>{
    
   
    // res.render("create_post.ejs");
   
    res.render("create_post.ejs");
    
});


app.post("/submit" ,(req,res)=>{
    // var author_name= req.body["name"] ;
    // var title=req.body["title"];
    // var blog_text =req.body["blog_text"];
    const blog={
        author_name :
        // author_name,
         req.body["name"]  ,
        title:
        // title,
        req.body["title"],
        blog_text:
        // blog_text,
        req.body["blog_text"],
    };

    posts.push(blog);

    res.redirect("/post");

});




app.get("/view",(req,res)=>{
    res.render("show_the_post.ejs",{ 
    
            posts:posts,
});
    
});


app.post("/update" ,(req,res)=>{
   
    let updated_author_name= req.body["name"];
    let updated_title=req.body["title"];
    let updated_blog_text=req.body["blog_text"];
    let tail = Number(req.body["idx"]);
    console.log("idx " + tail);

    let obj1={
        updated_author_name,
        updated_title,
        updated_blog_text,
        tail,
    }

    res.render("update_post.ejs",{
       obj:obj1,
    });
    
    
});


//below route to redirect to view after updating blog
app.post("/view",(req,res)=>{
    let point = Number(req.body["updated_idx"]);
    console.log("updated_idx " +point);
    //index_update
    posts[point].author_name = req.body["name"];
    posts[point].title = req.body["title"];
    posts[point].blog_text = req.body["blog_text"];
    res.redirect("/view");
    });



//delete function for blogs
function del_el(el){
    
    posts.splice(el,1);
    }
    
//route for deleting blog from the delete button in update form
app.post("/delete",(req,res)=>{
    let i = Number(req.body["updated_idx"]);
    del_el(i);
    res.redirect("/view");
});

// if(posts.length>2){
    
// }

app.listen(port,()=>{
    console.log(`the app is running on port ${port}`);
})